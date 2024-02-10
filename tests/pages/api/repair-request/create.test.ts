import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { RepairRequest } from "@prisma/client";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/repair-request";

import prisma from "../../../../src/lib/prisma";
import { cleanup, seedTestData } from "../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("POST /api/repair-request", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();
    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");
  });

  it("should return 400 status code on invalid fields", async () => {
    await testApiHandler({
      handler,
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
            comment: "Help please."
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
      }
    });
  });
});
