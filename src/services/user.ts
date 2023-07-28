/* eslint-disable no-unused-vars */

import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server/clerkClient";

interface IUserService {
  getAll(): Promise<User[]>;
  getUser(userId: string): Promise<User>;
}

class UserService implements IUserService {
  async getAll(): Promise<User[]> {
    return await clerkClient.users.getUserList({
      limit: 100,
      orderBy: "-created_at"
    });
  }

  async getUser(userId: string): Promise<User> {
    return await clerkClient.users.getUser(userId);
  }
}

export default UserService;
