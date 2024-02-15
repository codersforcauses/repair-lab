/* eslint-disable no-unused-vars */

import { clerkClient } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/server";

import { PaginationResponse } from "@/lib/pagination";
import { User, UserRole, UserSearchQuery } from "@/types";

type ClerkOrderBy =
  | "created_at"
  | "updated_at"
  | "+created_at"
  | "+updated_at"
  | "-created_at"
  | "-updated_at";

async function getMany(
  options: UserSearchQuery
): Promise<PaginationResponse<User[]>> {
  const { orderBy, perPage, page, query, userId } = options;

  const searchRequest = {
    orderBy: orderBy as ClerkOrderBy,
    limit: perPage,
    offset: (page - 1) * perPage,
    query,
    userId
  };

  // getCount requires a search request too so it returns the total query count.
  const users = await clerkClient.users.getUserList(searchRequest);
  const totalCount = await clerkClient.users.getCount(searchRequest);

  return {
    items: users.map((user) => toResponse(user)),
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
  const userMap = users.reduce(
    (map, clerkUser) => {
      map[clerkUser.id] = toResponse(clerkUser);
      return map;
    },
    {} as Partial<Record<string, User>>
  );

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
  return await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      role: role
    }
  });
}

function toResponse(user: ClerkUser): User {
  const { emailAddresses, publicMetadata } = user;
  const role = publicMetadata.role
    ? (publicMetadata.role as UserRole)
    : UserRole.CLIENT;
  const emailAddress = emailAddresses[0].emailAddress;

  return {
    ...user,
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
  getMany,
  getUser,
  getUsers,
  updateRole,
  getUserMapFromIds,
  unknownUser
};

export default userService;
