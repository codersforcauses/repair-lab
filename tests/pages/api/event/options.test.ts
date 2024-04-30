import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it } from "vitest";

import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/event/options";

import { cleanup } from "../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event/options", () => {
  beforeAll(async () => {
    await cleanup();
    await prisma.itemType.createMany({
      data: [{ name: "Laptop" }, { name: "Bicycle" }]
    });

    await prisma.event.createMany({
      data: [
        {
          id: "56005d72-2614-11ee-be56-0242ac120002",
          createdBy: "Bob the Builder",
          name: "Some Repair Event",
          location: "UWA",
          description: "Laptop repair event for students.",
          eventType: "Laptop",
          startDate: new Date(),
          endDate: new Date()
        },
        {
          id: "acf5ed50-19a2-11ee-be56-0242ac120002",
          createdBy: "Peppa Pig",
          name: "Another Repair Event",
          location: "Perth CBD",
          description: "Bicycle repair event.",
          eventType: "Bicycle",
          startDate: new Date(),
          endDate: new Date()
        }
      ]
    });
  });

  it("should return event options", async () => {
    await testApiHandler({
      handler,
      url: "/",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        expect(res.status).toBe(200);
        const result = await res.json();
        expect(result.length).equals(2);
        expect(result[0].name).equals("Some Repair Event");
        expect(result[0].id).equals("56005d72-2614-11ee-be56-0242ac120002");
        expect(result[1].name).equals("Another Repair Event");
        expect(result[1].id).equals("acf5ed50-19a2-11ee-be56-0242ac120002");
      }
    });
  });
});
