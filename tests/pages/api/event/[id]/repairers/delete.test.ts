import { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/event/[id]/repairers";

import prisma from "../../../../../setup";
import { cleanup, seedTestData } from "../../../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("DELETE /api/event/[id]/repairers", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

    await prisma.eventRepairer.createMany({
      data: [
        {
          userId: "mock user1",
          eventId: "acf5ed50-19a2-11ee-be56-0242ac120002"
        },
        {
          userId: "mock user2",
          eventId: "acf5ed50-19a2-11ee-be56-0242ac120002"
        }
      ]
    });

    // TODO - Figure out how to mock getting Clerk Users
    vi.mock("@clerk/nextjs");
    vi.mock("@clerk/nextjs/server");
  });

  // TODO - REMOVE SKIP
  it.skip("should be able to delete repairers from an event", async () => {
    await testApiHandler({
      handler,
      params: {
        id: "acf5ed50-19a2-11ee-be56-0242ac120002",
        userId: ["mock user1", "mock user2"]
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await res.json();
        expect(result).toBe("Successfully removed volunteers from an event");
        expect(res.status).toBe(200);
        // TODO - Add more assertions after figuring out how to mock getting Clerk Users
        // expect(result).toBe();
      }
    });
  });
});
