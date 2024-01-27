import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup } from "@/../tests/utils";
import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/event/[id]/repair-request";
import { EventResponse } from "@/types";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event", () => {
  beforeAll(async () => {
    await cleanup();
    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");

    // Create item types
    await prisma.itemType.createMany({
      data: ["Laptop", "Clock", "Sponge"].map((name) => ({ name }))
    });

    // Create events - only id is important
    const baseEventDetails = {
      location: "Curtin University",
      createdBy: "user_1",
      eventType: "Laptop",
      description: "Laptop repair event.",
      startDate: new Date("2023-11-16"),
      endDate: new Date("2023-11-17")
    };
    const eventIds = ["ev-1", "ev-2"];
    await prisma.event.createMany({
      data: eventIds.map((id) => ({ ...baseEventDetails, id, name: id }))
    });

    // Create repair requests
    const baseRepairRequestDetails = {
      comment: "Some comment",
      thumbnailImage: ""
    };
    await prisma.repairRequest.createMany({
      data: [
        {
          ...baseRepairRequestDetails,
          id: "rr-1",
          eventId: "ev-1",
          createdBy: "user_1",
          description: "My laptop is broken",
          itemType: "Laptop",
          itemBrand: "Apple",
          assignedTo: "user_2"
        },
        {
          ...baseRepairRequestDetails,
          id: "rr-2",
          eventId: "ev-1",
          createdBy: "user_1",
          description: "Very specific word: eggplant",
          itemType: "Clock",
          itemBrand: "Clock Co"
        },
        {
          ...baseRepairRequestDetails,
          id: "rr-3",
          eventId: "ev-2",
          createdBy: "user_2",
          description: "My laptop is broken",
          itemType: "Laptop",
          itemBrand: "Dell"
        },
        {
          ...baseRepairRequestDetails,
          id: "rr-4",
          eventId: "ev-2",
          createdBy: "user_1",
          description: "Yep",
          itemType: "Laptop",
          itemBrand: "Dell"
        }
      ]
    });
  });
  type AllowedParams = {
    id?: string;
    sortKey?: string;
    sortMethod?: string;
    searchWord?: string;
    item?: string | string[];
    brand?: string | string[];
    assignedTo?: string | string[];
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
        const results: EventResponse[] = await res.json();
        expect(res.status).toBe(200);
        expect(results.length).toBe(expectedEvents.length);
        results.forEach((result, index) => {
          expect(result).toHaveProperty("id", expectedEvents[index]);
        });
      }
    });
  };
  const testBadFilter = async (filters: AllowedParams, code: number = 400) => {
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
        expect(res.status).toBe(code);
      }
    });
  };

  // RETURNS CORRECT VALUES
  it("should be able to get repair requests", async () => {
    await testFilter({ id: "ev-1" }, ["rr-1", "rr-2"]);
    await testFilter({ id: "ev-2" }, ["rr-3", "rr-4"]);
  });

  it("should be able to filter repair requests by searching description", async () => {
    await testFilter({ id: "ev-1", searchWord: "eggplant" }, ["rr-2"]);
  });

  it("should be able to filter repair requests by searching user", async () => {
    await testFilter({ id: "ev-1", searchWord: "Justin" }, ["rr-1", "rr-2"]);
    await testFilter({ id: "ev-2", searchWord: "spongebob" }, ["rr-3"]);
  });

  it("should be able to filter repair requests by brand", async () => {
    await testFilter({ id: "ev-1", searchWord: "Justin" }, ["rr-1", "rr-2"]);
  });

  it("should be able to filter repair requests by item type", async () => {
    await testFilter({ id: "ev-1", item: "Laptop" }, ["rr-1"]);
    await testFilter({ id: "ev-2", item: "Laptop" }, ["rr-3", "rr-4"]);
  });

  it("should be able to filter repair requests by assignee", async () => {
    await testFilter({ id: "ev-1", assignedTo: "user_2" }, ["rr-1"]);
    await testFilter({ id: "ev-1", assignedTo: "unassigned" }, ["rr-2"]);
  });

  it("should return all repair requests when empty filter provided", async () => {
    await testFilter({ id: "ev-1", item: "" }, ["rr-1", "rr-2"]);
    await testFilter({ id: "ev-1", brand: "" }, ["rr-1", "rr-2"]);
    await testFilter({ id: "ev-2", brand: "" }, ["rr-3", "rr-4"]);
  });

  // CORRECTLY FAILS
  it("should return 400 if no event id passed", async () => {
    await testBadFilter({ searchWord: "eggplant" });
  });

  it("should return 404 if no event is found", async () => {
    await testBadFilter({ id: "ev-3" }, 404);
  });

  it("should return 400 if invalid sorting", async () => {
    await testBadFilter({ sortKey: "WOOHOO" });
    await testBadFilter({ sortMethod: "WOOHOO" });
  });
});
