import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/event/[id]/repairers";

import prisma from "../../../../../setup";
import { cleanup, seedTestData } from "../../../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("POST /api/event/[id]/repairers", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

    vi.mock("@clerk/nextjs");
    vi.mock("@clerk/nextjs/server");
  });

  it.only("should be able to create an event repairer", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: ["Test"]
          })
        });

        const eventId = "acf5ed50-19a2-11ee-be56-0242ac120002";

        // console.log(JSON.stringify(await res.json(), null, 2));

        const createdEvent = await prisma.eventRepairer.findMany({
          where: { eventId: eventId }
        });

        const expectedEvent = [
          {
            userId: "Test",
            eventId: "acf5ed50-19a2-11ee-be56-0242ac120002"
          }
        ];

        expect(res.status).toBe(200);
        expect(createdEvent[0].userId).toBe(expectedEvent[0].userId);
        expect(createdEvent[0].eventId).toBe(expectedEvent[0].eventId);
      }
    });
  });

  it("should be able to create an event repairer with multiple volunteers", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: ["Test", "user_1", "user_2"]
          })
        });

        const eventId = "acf5ed50-19a2-11ee-be56-0242ac120002";

        const createdEvent = await prisma.eventRepairer.findMany({
          where: { eventId: eventId }
        });

        const expectedEvent = [
          {
            userId: "Test",
            eventId: "acf5ed50-19a2-11ee-be56-0242ac120002"
          },
          {
            userId: "user_1",
            eventId: "acf5ed50-19a2-11ee-be56-0242ac120002"
          },
          {
            userId: "user_2",
            eventId: "acf5ed50-19a2-11ee-be56-0242ac120002"
          }
        ];

        expect(res.status).toBe(200);
        expect(createdEvent[0].userId).toBe(expectedEvent[0].userId);
        expect(createdEvent[0].eventId).toBe(expectedEvent[0].eventId);
        expect(createdEvent[1].userId).toBe(expectedEvent[1].userId);
        expect(createdEvent[1].eventId).toBe(expectedEvent[1].eventId);
        expect(createdEvent[2].userId).toBe(expectedEvent[2].userId);
        expect(createdEvent[2].eventId).toBe(expectedEvent[2].eventId);
      }
    });
  });

  it("should be able to catch an API error: can't find the event", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac122222" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: ["user_1"]
          })
        });

        const eventId = "acf5ed50-19a2-11ee-be56-0242ac122222";

        const createdEvent = await prisma.eventRepairer.findMany({
          where: { eventId: eventId }
        });

        expect(res.status).toBe(404);
        expect(createdEvent).toBe(null);
      }
    });
  });

  it("should be able to catch an API error: can't find the repairer", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: ["user_bruh", "user_bruh_1", "user_bruh_2"]
          })
        });

        const eventId = "acf5ed50-19a2-11ee-be56-0242ac120002";

        const createdEvent = await prisma.eventRepairer.findMany({
          where: { eventId: eventId }
        });

        expect(createdEvent).toBe(null);
        expect(res.status).toBe(404);
      }
    });
  });

  it("should be able to catch an API error: can't find the repairer", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: ["user_bruh"]
          })
        });

        const eventId = "acf5ed50-19a2-11ee-be56-0242ac122222";

        const createdEvent = await prisma.eventRepairer.findMany({
          where: { eventId: eventId }
        });

        expect(res.status).toBe(404);
        expect(createdEvent).toBe(null);
      }
    });
  });
});
