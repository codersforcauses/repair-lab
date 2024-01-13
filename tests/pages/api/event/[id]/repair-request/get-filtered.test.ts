import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { EventStatus } from "@prisma/client";
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
      disclaimer: "This is a disclaimer",
      location: "Curtin University",
      createdBy: "user_1",
      eventType: "Laptop",
      description: "Laptop repair event.",
      startDate: new Date("2023-11-16"),
      endDate: new Date("2023-11-17"),
      status: "COMPLETED" as EventStatus
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
          itemBrand: "Apple"
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
        expect(results.length).toEqual(expectedEvents.length);
        results.forEach((result, index) => {
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
  it("should be able to filter events by searching description", async () => {
    await testFilter({ id: "ev-1", searchWord: "eggplant" }, ["rr-2"]);
  });

  it("should be able to filter events by searching user", async () => {
    await testFilter({ id: "ev-1", searchWord: "Justin" }, ["rr-1", "rr-2"]);
  });

  // it("should be able to filter events by date", async () => {
  //   await testFilter(
  //     {
  //       minStartDate: new Date("2023-11-25").toISOString(),
  //       maxStartDate: new Date("2023-12-1").toISOString()
  //     },
  //     ["ev-2"]
  //   );
  // });

  // it("should be able to filter events by event types", async () => {
  //   await testFilter({ eventType: ["Clock", "Sponge"] }, ["ev-2", "ev-3"]);
  // });
  // it("should be able to filter events by event status", async () => {
  //   await testFilter({ eventStatus: ["COMPLETED"] }, ["ev-1"]);
  // });
  // it("should be able to filter events by multiple", async () => {
  //   await testFilter({ createdBy: ["user_1"], eventType: ["Laptop"] }, [
  //     "ev-1"
  //   ]);
  // });
  // it("should return empty when none selected", async () => {
  //   await testFilter({ eventType: [] }, []);
  //   await testFilter({ eventStatus: [] }, []);
  //   await testFilter({ eventType: "" }, []);
  //   await testFilter({ eventStatus: "" }, []);
  // });

  // // CORRECTLY FAILS
  // it("should return 400 if invalid status passed", async () => {
  //   await testBadFilter({ eventStatus: ["WOOHOO"] });
  // });
  // it("should return 400 if invalid sorting", async () => {
  //   await testBadFilter({ sortKey: "WOOHOO" });
  //   await testBadFilter({ sortMethod: "WOOHOO" });
  // });
  // it("should return 400 if invalid date", async () => {
  //   await testBadFilter({ minStartDate: "HAHA" });
  // });
});
