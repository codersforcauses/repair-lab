/* eslint-disable no-unused-vars */

import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server/clerkClient";

import {
  buildPaginationResponse,
  PaginationOptions,
  PaginationResponse
} from "@/lib/pagination";

type ClerkOrderBy =
  | "created_at"
  | "updated_at"
  | "+created_at"
  | "+updated_at"
  | "-created_at"
  | "-updated_at";

interface UserResponse {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  role: string | unknown;
}

interface IUserService {
  getMany(
    options: PaginationOptions
  ): Promise<PaginationResponse<UserResponse>>;
  getUser(userId: string): Promise<UserResponse>;
  updateRole(userId: string, role: string): void;
}

class UserService implements IUserService {
  async getMany(
    options: PaginationOptions
  ): Promise<PaginationResponse<UserResponse>> {
    const { orderBy, ...rest } = options;

    const users = await clerkClient.users.getUserList({
      orderBy: orderBy as ClerkOrderBy,
      ...rest
    });
    const totalCount = await clerkClient.users.getCount();

    return buildPaginationResponse<UserResponse>(
      users.map((user) => this.toResponse(user)),
      options,
      totalCount
    );
  }

  async getUser(userId: string): Promise<UserResponse> {
    const user = await clerkClient.users.getUser(userId);
    return this.toResponse(user);
  }

  async updateRole(userId: string, role: string) {
    return await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: role
      }
    });
  }

  private toResponse(user: User): UserResponse {
    const { id, firstName, lastName, emailAddresses, publicMetadata } = user;
    const role = publicMetadata.role;
    const emailAddress = emailAddresses[0].emailAddress;

    return {
      id,
      firstName,
      lastName,
      role,
      emailAddress
    };
  }
}

export default UserService;
