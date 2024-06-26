import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup } from "@/../tests/utils";
import { PaginationResponse } from "@/lib/pagination";
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
    sortKey?: string;
    sortMethod?: string;
    searchWord?: string;
    minDate?: string;
    maxDate?: string;
    eventType?: string | string[];
    eventStatus?: string | string[];
    createdBy?: string | string[];
  };
  const testFilter = async (
    filters: AllowedParams,
    expectedEvents: string[]
  ) => {
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
        const results: PaginationResponse<EventResponse[]> = await res.json();
        const list = results.items;
        expect(res.status).toBe(200);
        expect(list.length).toEqual(expectedEvents.length);
        list.forEach((result, index) => {
          expect(result).toHaveProperty("id", expectedEvents[index]);
        });
      }
    });
  };
  const testBadFilter = async (filters: AllowedParams) => {
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
        expect(res.status).toBe(400);
      }
    });
  };

  // RETURNS CORRECT VALUES
  it("should be able to filter events by search", async () => {
    await testFilter({ searchWord: "Jig" }, ["ev-1", "ev-2"]);
  });

  it("should be able to filter events by user", async () => {
    await testFilter({ createdBy: ["user_2"] }, ["ev-3"]);
  });

  it("should be able to filter events by date", async () => {
    await testFilter(
      {
        minDate: "2023-11-25",
        maxDate: "2023-12-1"
      },
      ["ev-2"]
    );
  });

  it("should be able to filter events by event types", async () => {
    await testFilter({ eventType: ["Clock", "Sponge"] }, ["ev-2", "ev-3"]);
  });
  it("should be able to filter events by event status", async () => {
    await testFilter({ eventStatus: ["COMPLETED"] }, ["ev-1"]);
  });
  it("should be able to filter events by multiple", async () => {
    await testFilter({ createdBy: ["user_1"], eventType: ["Laptop"] }, [
      "ev-1"
    ]);
  });
  it("should return empty when none selected", async () => {
    await testFilter({ eventType: [] }, []);
    await testFilter({ eventStatus: [] }, []);
    await testFilter({ eventType: "" }, []);
    await testFilter({ eventStatus: "" }, []);
  });

  // CORRECTLY FAILS
  it("should return 400 if invalid status passed", async () => {
    await testBadFilter({ eventStatus: ["WOOHOO"] });
  });
  it("should return 400 if invalid sorting", async () => {
    await testBadFilter({ sortKey: "WOOHOO" });
    await testBadFilter({ sortMethod: "WOOHOO" });
  });
  it("should return 400 if invalid date", async () => {
    await testBadFilter({ minDate: "HAHA" });
  });
});
