/* eslint-disable no-unused-vars */

import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server/clerkClient";

interface UserResponse {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  role: string | unknown;
}

interface IUserService {
  getAll(): Promise<UserResponse[]>;
  getUser(userId: string): Promise<UserResponse>;
  updateRole(userId: string, role: string): void;
}

class UserService implements IUserService {
  async getAll(): Promise<UserResponse[]> {
    const users = await clerkClient.users.getUserList({
      limit: 100,
      orderBy: "-created_at"
    });

    return users.map((user) => this.toResponse(user));
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
