import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { RepairRequest } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";

import endpoint, { config } from "@/pages/api/repair-request";

import { cleanup } from "../../utils";
import prisma from "../../../src/lib/prisma";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

describe("POST /api/repair-request", () => {
  beforeAll(async () => {
    await cleanup();
    await prisma.brand.create({
      data: {
        name: "Apple"
      }
    });
    await prisma.itemType.create({
      data: {
        name: "Laptop"
      }
    });
    await prisma.event.create({
      data: {
        id: "acf5ed50-19a2-11ee-be56-0242ac120002",
        createdBy: "mock user",
        name: "Laptop Repair Event",
        location: "Curtin University",
        eventType: "Laptop",
        description: "Laptop repair event.",
        volunteers: ["Justin", "Spongebob"],
        startDate: new Date(),
        endDate: new Date()
      }
    });
  });

  it("should return 400 status code on invalid fields", async () => {
    await testApiHandler({
      handler,
      url: "/",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            eventId: Number(1234),
            itemBrand: "",
            description: "asd"
          })
        });

        expect(res.status).toBe(400);
      }
    });
  });

  it("should be able to create a repair request", async () => {
    await testApiHandler({
      handler,
      url: "/",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            eventId: "acf5ed50-19a2-11ee-be56-0242ac120002",
            itemType: "Laptop",
            description: "My Macbook screen came off",
            itemBrand: "Apple",
            comment: "Help please.",
            thumbnailImage: "https://i.imgur.com/3f3r8hm.jpg"
          })
        });

        expect(res.status).equals(200);

        const result = await res.json();
        const repairRequestId = result.id;

        const expectedRepairRequest: RepairRequest | null =
          await prisma.repairRequest.findUnique({
            where: {
              id: repairRequestId
            }
          });

        expect(expectedRepairRequest?.eventId).equals(
          "acf5ed50-19a2-11ee-be56-0242ac120002"
        );
        expect(expectedRepairRequest?.itemType).equals("Laptop");
        expect(expectedRepairRequest?.description).equals(
          "My Macbook screen came off"
        );
        expect(expectedRepairRequest?.itemBrand).equals("Apple");
        expect(expectedRepairRequest?.comment).equals("Help please.");
        expect(expectedRepairRequest?.thumbnailImage).equals(
          "https://i.imgur.com/3f3r8hm.jpg"
        );
      }
    });
  });
});
