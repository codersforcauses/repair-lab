import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup } from "@/../tests/utils";
import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/event";
import { EventResponse } from "@/types";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event", () => {
  beforeAll(async () => {
    await cleanup();
    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");

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
  });
  type AllowedParams = {
    searchWord?: string;
    startDate?: string;
    endDate?: string;
    eventType?: string;
    eventStatus?: string;
    createdBy?: string;
  };
  const testFilter = async (
    filters: AllowedParams,
    expectedEvents: string[]
  ) => {
    await testApiHandler({
      handler,
      params: {
        sortKey: "startDate",
        sortMethod: "asc",
        ...filters
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const results: EventResponse[] = await res.json();
        expect(res.status).toBe(200);
        results.forEach((result, index) => {
          expect(result).toHaveProperty("id", expectedEvents[index]);
        });
      }
    });
  };

  it("should be able to filter events by search", async () => {
    await testFilter({ searchWord: "Jig" }, ["ev-1", "ev-2"]);
  });

  it("should be able to filter events by user", async () => {
    await testFilter({ createdBy: "user_2" }, ["ev-3"]);
  });

  it("should be able to filter events by date", async () => {
    await testFilter(
      {
        startDate: new Date("2023-11-25").toISOString(),
        endDate: new Date("2023-12-1").toISOString()
      },
      ["ev-2"]
    );
  });

  it("should be able to filter events by event types", async () => {
    await testFilter({ eventType: "Clock,Sponge" }, ["ev-2", "ev-3"]);
  });
  it("should be able to filter events by event status", async () => {
    await testFilter({ eventStatus: "COMPLETED" }, ["ev-1"]);
  });
  it("should be able to filter events by multiple", async () => {
    await testFilter({ createdBy: "user_1", eventType: "Laptop" }, ["ev-1"]);
  });
});
