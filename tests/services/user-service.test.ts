import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup } from "../utils";

const TOTAL_USERS = 1111;
process.env.CLERK_SECRET_KEY = "";

// Custom mock to return A LOT of users
const mockClerkClient = () => {
  const users = Array.from({ length: TOTAL_USERS }, (_, i) => ({
    id: `user-${i}`,
    publicMetadata: { role: "test" },
    emailAddresses: [{ emailAddress: "test" }]
  }));

  const getUsers = ({ limit = 10, offset = 0 }) => {
    const paginatedUsers = users.slice(offset, offset + limit);
    return paginatedUsers;
  };

  return {
    clerkClient: {
      users: {
        getCount: vi.fn().mockReturnValue(TOTAL_USERS),
        getUserList: vi.fn().mockImplementation(getUsers)
      }
    }
  };
};
// doMock is not hoisted
vi.doMock("@clerk/nextjs", mockClerkClient);

describe("User Service", async () => {
  beforeAll(async () => {
    await cleanup();
  });
  const { default: userService } = await import("@/services/user");

  it("should be able to get all users", async () => {
    const users = await userService.getAll({
      orderBy: "+created_at",
      query: ""
    });
    expect(users.length).equals(TOTAL_USERS);
  });
});
