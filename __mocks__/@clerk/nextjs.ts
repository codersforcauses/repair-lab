import { vi } from "vitest";

export const mockClerkUsers = [
  {
    id: "mock user",
    firstName: "test",
    lastName: "test",
    emailAddresses: [{ emailAddress: "test@gmail.com" }],
    publicMetadata: {
      role: "CLIENT"
    }
  },
  {
    id: "user_1",
    firstName: "Justin",
    lastName: "",
    emailAddresses: [{ emailAddress: "justin@gmail.com" }],
    publicMetadata: {
      role: "CLIENT"
    }
  },
  {
    id: "user_2",
    firstName: "Spongebob",
    lastName: "",
    emailAddresses: [{ emailAddress: "spongebob@gmail.com" }],
    publicMetadata: {
      role: "CLIENT"
    }
  }
];

export const clerkClient = {
  users: {
    getUserList: vi.fn().mockReturnValue(mockClerkUsers)
  }
};
