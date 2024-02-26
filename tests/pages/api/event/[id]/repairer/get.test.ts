import { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/event/[id]/repairers";

import prisma from "../../../../../setup";
import { cleanup, seedTestData } from "../../../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event/[id]/repairers", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();
    await prisma.eventRepairer.create({
      data: {
        userId: "mock user",
        eventId: "acf5ed50-19a2-11ee-be56-0242ac120002"
      }
    });

    // TODO - Figure out how to mock getting Clerk Users
    vi.mock("@clerk/nextjs");
    vi.mock("@clerk/nextjs/server");
  });

  it("should return 200 when it is able to get repairers from an event", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await res.json();

        const expectedRepairer = {
          id: "mock user",
          firstName: "first-name",
          lastName: "last-name",
          role: "REPAIRER",
          emailAddress: "jimbo@jimbo.com"
        };

        expect(res.status).toBe(200);

        // TODO - Update this after figuring out how to mock getting Clerk Users
        // expect(result).toBe();
        // expect(result).toMatchObject(expectedRepairer);
      }
    });
  });
});
