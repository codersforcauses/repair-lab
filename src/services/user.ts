/* eslint-disable no-unused-vars */

import { NextApiRequest } from "next";
import { clerkClient } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/server";
import { getAuth as getClerkAuth } from "@clerk/nextjs/server";

import { PaginationResponse } from "@/lib/pagination";
import prisma from "@/lib/prisma";
import { User, UserRole, UserSearchQuery } from "@/types";

async function getAuth(req: NextApiRequest) {
  const auth = getClerkAuth(req);
  const role = await getRole(auth.userId!);

  return {
    ...auth,
    role
  };
}

async function getMany(
  options: UserSearchQuery
): Promise<PaginationResponse<User[]>> {
  const { perPage, page, role } = options;

  // Ids of users with roles are stored in the staff table.
  if (role) return getStaffs(options);

  const { users, totalCount } = await getUsersFromClerk({ ...options });

  const items = await Promise.all(
    users.map(async (user) => await toResponse(user))
  );

  return {
    items,
    meta: {
      totalCount,
      page,
      perPage,
      lastPage: Math.ceil(totalCount / perPage)
    }
  };
}

/**
 * Goes through and gets all users from the pagination
 * @param options - { orderBy, query, userId }
 * @returns A list of all users
 */
async function getAll(
  options: Omit<UserSearchQuery, "page" | "perPage">
): Promise<User[]> {
  const { orderBy, query, userId } = options;

  const perRequest = 499;

  const searchRequest = {
    orderBy: orderBy as ClerkOrderBy,
    offset: 0,
    limit: perRequest,
    query,
    userId
  };

  const totalCount = await clerkClient.users.getCount(searchRequest);
  const allUsers: ClerkUser[] = [];
  let page = 0;
  while (allUsers.length < totalCount) {
    const users = await clerkClient.users.getUserList({
      ...searchRequest,
      offset: page * perRequest
    });
    if (users.length == 0) break;
    allUsers.push(...users);
    page++;
  }

  return allUsers.map((user) => toResponse(user));
}
async function getUserMapFromIds(userIds: string[]) {
  const users = await clerkClient.users.getUserList({ userId: userIds });

  const userMap: Partial<Record<string, User>> = {};
  for (const user of users) {
    userMap[user.id] = await toResponse(user);
  }

  return userMap;
}

async function getUser(userId: string) {
  const user = await clerkClient.users.getUser(userId);

  return user ? toResponse(user) : undefined;
}

async function getUsers(userIds: string[]) {
  return await Promise.all(userIds.map((userId) => getUser(userId)));
}

async function updateRole(userId: string, role: UserRole) {
  // Deleting the role from staff if the role to set is CLIENT
  if (role === UserRole.CLIENT) {
    return await prisma.staff.delete({
      where: {
        clerkId: userId
      }
    });
  }

  // Creating a new staff role if does not already exist.
  return prisma.staff.upsert({
    where: {
      clerkId: userId
    },
    create: {
      role: role,
      clerkId: userId
    },
    update: {
      role: role
    }
  });
}

async function getRole(userId: string): Promise<UserRole> {
  const staff = await prisma.staff.findFirst({
    select: {
      role: true
    },
    where: {
      clerkId: userId
    }
  });

  // we want to default to CLIENT if user is not in the db.
  const role = staff?.role ?? UserRole.CLIENT;

  return role;
}

async function toResponse(user: ClerkUser, role?: UserRole): Promise<User> {
  const { emailAddresses, id, firstName, lastName } = user;
  // slight optimisation to prevent hitting the database if the role for the
  // user is already known.
  const userRole = role ?? (await getRole(id));
  const emailAddress = emailAddresses[0].emailAddress;

  return {
    id,
    firstName,
    lastName,
    role: userRole,
    emailAddress
  };
}

const userService = {
  getAuth,
  getMany,
  getAll,
  getUser,
  getUsers,
  updateRole,
  getRole,
  getUserMapFromIds,
  unknownUser
};

export default userService;

/* --------  Helper Functions -------- */

const getStaffs = async ({
  orderBy,
  perPage,
  page,
  query,
  userId,
  role
}: UserSearchQuery) => {
  const staffs = await prisma.staff.findMany({
    select: { clerkId: true },
    where: { role, clerkId: { in: userId } },
    skip: (page - 1) * perPage,
    take: perPage
  });

  // No staffs matching, don't have have to query clerk.
  if (!staffs || staffs.length === 0) {
    return {
      items: [],
      meta: {
        totalCount: 0,
        page,
        perPage,
        lastPage: Math.ceil(0 / perPage)
      }
    };
  }

  const { users, totalCount } = await getUsersFromClerk({
    orderBy,
    perPage,
    page,
    query,
    userId: staffs.map((s) => s.clerkId)
  });
  const items = await Promise.all(
    users.map(async (u) => await toResponse(u, role))
  );

  return {
    items,
    meta: {
      totalCount,
      page,
      perPage,
      lastPage: Math.ceil(totalCount / perPage)
    }
  };
};

const getUsersFromClerk = async ({
  orderBy,
  perPage,
  page,
  query,
  userId
}: Exclude<UserSearchQuery, "role">) => {
  const searchRequest = {
    orderBy: orderBy,
    limit: perPage,
    offset: (page - 1) * perPage,
    query,
    userId: userId
  };

  const users = await clerkClient.users.getUserList(searchRequest);
  const totalCount = await clerkClient.users.getCount(searchRequest);

  return { users, totalCount };
};

/** Used when a user cannot be found in clerk */
function unknownUser(userId: string): User {
  // TODO: stop force type casting userrole
  return {
    id: userId,
    firstName: "Unknown",
    lastName: "",
    emailAddress: "Unknown",
    role: "Unknown" as UserRole
  };
}
