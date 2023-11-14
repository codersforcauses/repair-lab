import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { RepairRequest } from "@prisma/client";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint, { config } from "@/pages/api/repair-request";

import prisma from "../../../../src/lib/prisma";
import { cleanup, seedTestData } from "../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

describe("PATCH /api/repair-request/:id", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

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
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: "56005d72-2614-11ee-be56-0242ac120002",
            hoursWorked: "asdfasdf",
            isRepaired: "true",
            isSparePartsNeeded: "true",
            spareParts: "battery",
            repairComment: "sfs"
          })
        });

        expect(res.status).toBe(400);
      }
    });
  });

  it("should return 404 status code for an invalid repair request", async () => {
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
