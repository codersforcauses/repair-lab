import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server/clerkClient";

interface IUserService {
  getAll(): Promise<User[]>;
  getUser(userId: string): Promise<User>;
}

class UserService implements IUserService {
  async getAll(): Promise<User[]> {
    return await clerkClient.users.getUserList();
  }

  async getUser(userId: string): Promise<User> {
    return await clerkClient.users.getUser(userId);
  }
}

export default UserService;
