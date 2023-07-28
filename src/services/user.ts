/* eslint-disable no-unused-vars */

import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server/clerkClient";

interface IUserService {
  getAll(): Promise<Partial<User>[]>;
  getUser(userId: string): Promise<Partial<User>>;
  updateRole(userId: string, role: string): Promise<User>;
}

class UserService implements IUserService {
  async getAll(): Promise<Partial<User>[]> {
    const users = await clerkClient.users.getUserList({
      limit: 100,
      orderBy: "-created_at"
    });

    return users.map((user) => this.toResponse(user));
  }

  async getUser(userId: string): Promise<Partial<User>> {
    const user = await clerkClient.users.getUser(userId);
    return this.toResponse(user);
  }

  async updateRole(userId: string, role: string): Promise<User> {
    return await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: role
      }
    });
  }

  private toResponse(user: User): Partial<User> {
    const { id, firstName, lastName, emailAddresses, publicMetadata } = user;
    return {
      id,
      firstName,
      lastName,
      emailAddresses,
      publicMetadata
    };
  }
}

export default UserService;
