import { vi } from "vitest";

import { UserRole } from "@/types";

import prisma from "../../tests/setup";

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
    id: "RepairerTesterNic",
    firstName: "Niccccc",
    lastName: "",
    emailAddresses: [{ emailAddress: "Niccccc@gmail.com" }],
    publicMetadata: {
      role: "REPAIRER"
    }
  },
  {
    id: "RepairerTesterFF",
    firstName: "FFAAAAN",
    lastName: "",
    emailAddresses: [{ emailAddress: "FFAAAAN@gmail.com" }],
    publicMetadata: {
      role: "REPAIRER"
    }
  }
];

// query partially matches userId, emailAddress, phoneNumber, username, web3Wallet, firstName, lastName
type BasicSearchParams = { query?: string };
export const queryUsers = ({ query }: BasicSearchParams) => {
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

prisma.event.createMany({
  data: [
    {
      id: "ev-3",
      createdBy: "user_2",
      name: "Test Event",
      eventType: "Sponge",
      description: "Sponge repair event.",
      startDate: new Date("2023-12-16"),
      endDate: new Date("2023-12-17"),
      location: "McDonalds"
    }
  ]
});

prisma.eventRepairer.create({
  data: {
    userId: "RepairerTesterNic",
    eventId: "ev-3"
  }
});

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
    }),
    getRole: vi.fn().mockImplementation(() => {
      return UserRole.REPAIRER;
    })
  }
};
