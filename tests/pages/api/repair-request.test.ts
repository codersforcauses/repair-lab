import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { RepairRequest } from "@prisma/client";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint, { config } from "@/pages/api/repair-request";

import { cleanup } from "../../utils";
import prisma from "../../../src/lib/prisma";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

describe("POST PATCH /api/repair-request", () => {
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
    await prisma.repairRequest.create({
      data: {
        id: "56005d72-2614-11ee-be56-0242ac120002",
        createdBy: "mock user",
        eventId: "acf5ed50-19a2-11ee-be56-0242ac120002",
        description: "My laptop is broken",
        itemType: "Laptop",
        itemBrand: "Apple",
        comment: "Some comment",
        thumbnailImage: ""
      }
    });

    vi.mock("@clerk/nextjs/server", () => {
      return {
        getAuth: vi.fn().mockReturnValue({ userId: "Test" })
      };
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
            thumbnailImage: "Fake S3 Key" // TODO: Change this once image upload works.
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
          "Fake S3 Key" // TODO: Change this once image upload works.
        );
      }
    });
  });

  // PATCH
  it("should return 404 status code on invalid fields", async () => {
    await testApiHandler({
      handler,
      url: "/",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: "NONEXISTENT_ID",
            item: "Clock",
            itemBrand: "Wonderland",
            itemMaterial: "Plastic",
            hoursWorked: 1.5,
            isRepaired: "true",
            isSparePartsNeeded: "true",
            spareParts: "battery",
            repairComment: "Fixed"
          })
        });

        expect(res.status).toBe(404);
      }
    });
  });

  it("should be able to update a repair request", async () => {
    await testApiHandler({
      handler,
      url: "/",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: "56005d72-2614-11ee-be56-0242ac120002",
            item: "Laptop",
            itemBrand: "Apple",
            itemMaterial: "Metal",
            hoursWorked: 9.9,
            isRepaired: "true",
            isSparePartsNeeded: "true",
            spareParts: "new brain x1",
            repairComment: "nice brain. fixed!"
          })
        });

        expect(res.status).toBe(200);

        const result = await res.json();
        const repairRequestId = result.id;

        const expectedRepairRequest: RepairRequest | null =
          await prisma.repairRequest.findUnique({
            where: {
              id: repairRequestId
            }
          });

        expect(expectedRepairRequest?.itemMaterial).equals("Metal");
        expect(expectedRepairRequest?.hoursWorked.toNumber()).equals(9.9);
        expect(expectedRepairRequest?.status).equals("REPAIRED");
        expect(expectedRepairRequest?.spareParts).equals("new brain x1");
        expect(expectedRepairRequest?.repairComment).equals(
          "nice brain. fixed!"
        );
      }
    });
  });
});
