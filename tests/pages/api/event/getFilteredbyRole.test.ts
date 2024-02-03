import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup } from "@/../tests/utils";
import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/event";

import { mockClerkUsers } from "../../../../__mocks__/@clerk/nextjs";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event", async () => {
  beforeAll(async () => {
    await cleanup();
    vi.mock("@clerk/nextjs/server", () => {
      return {
        getAuth: vi.fn().mockImplementationOnce(() => {
          return { userId: "RepairerTesterFF" };
        })
      };
    });
    vi.mock("@clerk/nextjs", () => {
      return {
        clerkClient: {
          users: {
            getUser: vi.fn().mockImplementationOnce(() => {
              return mockClerkUsers.find(
                (user) =>
                  user.id === "RepairerTesterFF" &&
                  user.publicMetadata.role === "REPAIRER"
              );
            })
          }
        }
      };
    });

    await prisma.itemType.createMany({
      data: ["Laptop", "Clock", "Sponge"].map((name) => ({ name }))
    });

    const unimportant = {
      disclaimer: "This is a disclaimer",
      location: "Curtin University"
    };

    await prisma.event.createMany({
      data: [
        {
          ...unimportant,
          id: "ev-1",
          createdBy: "user_1",
          name: "Big Jig",
          eventType: "Laptop",
          description: "Laptop repair event.",
          startDate: new Date("2023-11-16"),
          endDate: new Date("2023-11-17"),
          status: "COMPLETED"
        },
        {
          ...unimportant,
          id: "ev-2",
          createdBy: "user_1",
          name: "Small Jig",
          eventType: "Clock",
          description: "Clock repair event.",
          disclaimer: "This is a disclaimer",
          startDate: new Date("2023-11-26"),
          endDate: new Date("2023-11-27")
        },
        {
          ...unimportant,
          id: "ev-3",
          createdBy: "user_2",
          name: "Test Event",
          eventType: "Sponge",
          description: "Sponge repair event.",
          startDate: new Date("2023-12-16"),
          endDate: new Date("2023-12-17")
        }
      ]
    });
    await prisma.eventRepairer.create({
      data: {
        userId: "RepairerTesterFF",
        event: {
          connect: {
            id: "ev-3"
          }
        }
      }
    });
  });

  const eventGot = await prisma.event.findMany({
    where: {
      eventRepairers: {
        some: {
          userId: "RepairerTesterFF"
        }
      }
    }
  });

  console.log(eventGot);

  type AllowedParams = {
    sortKey?: string;
    sortMethod?: string;
    searchWord?: string;
    minDate?: string;
    maxDate?: string;
    eventType?: string | string[];
    eventStatus?: string | string[];
    createdBy?: string | string[];
  };

  const testRoleFilter = async (filters: AllowedParams) => {
    await testApiHandler({
      handler,
      params: { ...filters },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        expect(res.status).toBe(200);
      }
    });
  };

  it("get event test1: should be able to return all events", async () => {
    await testRoleFilter({});
  });
});
