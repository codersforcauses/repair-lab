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
  },
  {
    id: "Test",
    firstName: "Spongebob",
    lastName: "",
    emailAddresses: [{ emailAddress: "spongebob@gmail.com" }],
    publicMetadata: {
      role: "CLIENT"
    }
  },
  {
    id: "REPAIRER",
    firstName: "Mr Repair",
    lastName: "",
    emailAddresses: [{ emailAddress: "repair@gmail.com" }],
    publicMetadata: {
      role: "REPAIRER"
    }
  }
];

// query partially matches userId, emailAddress, phoneNumber, username, web3Wallet, firstName, lastName
type BasicSearchParams = { query?: string };
const queryUsers = ({ query }: BasicSearchParams) => {
  if (!query) return mockClerkUsers;

  const partialMatch = (string1: string) =>
    string1.toLowerCase().includes(query.toLowerCase());

  return mockClerkUsers.filter(
    (u) =>
      partialMatch(u.id) ||
      u.emailAddresses.some((e) => partialMatch(e.emailAddress)) ||
      partialMatch(u.firstName) ||
      partialMatch(u.lastName)
  );
};

export const clerkClient = {
  users: {
    getUserList: vi.fn().mockImplementation(queryUsers),
    getCount: vi
      .fn()
      .mockImplementation(
        (search: BasicSearchParams) => queryUsers(search).length
      ),
    getUser: vi.fn().mockImplementation((id) => {
      return mockClerkUsers.find((user) => user.id === id);
    })
  }
};
