/* eslint-disable no-unused-vars */

import { NextApiRequest } from "next";
import { clerkClient } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/server";
import { getAuth as getClerkAuth } from "@clerk/nextjs/server";

import { PaginationResponse } from "@/lib/pagination";
import prisma from "@/lib/prisma";
import { StaffRole, User, UserRole, UserSearchQuery } from "@/types";

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
  const { orderBy, perPage, page, query, userId, type } = options;

  const offset = (page - 1) * perPage;

  // TODO:
  // If type exists, then query the database, pass list of ids to clerk and return results.
  // else we will just search do the query as per normal.

  const searchRequest = {
    orderBy: orderBy,
    limit: perPage,
    offset: offset,
    query,
    userId
  };

  // getCount requires a search request too so it returns the total query count.
  const users = await clerkClient.users.getUserList(searchRequest);
  const totalCount = await clerkClient.users.getCount(searchRequest);

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

async function updateRole(userId: string, role: StaffRole) {
  // creating a new staff role if does not already exist.
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

async function toResponse(user: ClerkUser): Promise<User> {
  const { emailAddresses, id, firstName, lastName } = user;
  const role = await getRole(id);
  const emailAddress = emailAddresses[0].emailAddress;

  return {
    id,
    firstName,
    lastName,
    role,
    emailAddress
  };
}

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

const userService = {
  getAuth,
  getMany,
  getUser,
  getUsers,
  updateRole,
  getRole,
  getUserMapFromIds,
  unknownUser
};

export default userService;
