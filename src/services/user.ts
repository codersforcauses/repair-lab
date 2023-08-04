/* eslint-disable no-unused-vars */

import { clerkClient } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/server";

import {
  buildPaginationResponse,
  PaginationOptions,
  PaginationResponse
} from "@/lib/pagination";
import { User, UserRole } from "@/types";

type ClerkOrderBy =
  | "created_at"
  | "updated_at"
  | "+created_at"
  | "+updated_at"
  | "-created_at"
  | "-updated_at";

type UserResponse = User;

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
    const { orderBy, perPage, page, query } = options;

    const searchRequest = {
      orderBy: orderBy as ClerkOrderBy,
      limit: perPage,
      offset: (page - 1) * perPage,
      query
    };

    // getCount requires a search request too so it returns the total query count.
    const users = await clerkClient.users.getUserList(searchRequest);
    const totalCount = await clerkClient.users.getCount(searchRequest);

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

  private toResponse(user: ClerkUser): UserResponse {
    const { id, firstName, lastName, emailAddresses, publicMetadata } = user;
    const role = publicMetadata.role ? publicMetadata.role : UserRole.CLIENT;
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
