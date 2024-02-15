import type { PageConfig } from "next";
import { UserRole } from "@prisma/client";
import { beforeAll, describe, expect, it, vi } from "vitest";

//
import endpoint from "@/pages/api/event";
import { NextApiRequestWithUser } from "@@/src/middleware";
import { cleanup, seedTestData, testApiHandler } from "@@/tests/utils";

import prisma from "../../../setup";
// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
describe("GET /api/event", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();
    await prisma.event.create({
      data: {
        createdBy: "mock user",
        name: "Ipad",
        location: "UWA",
        eventType: "Laptop",
        description: "Ipad repair",
        disclaimer: "This is a disclaimer",
        startDate: new Date("2023-11-16T01:27:08.417Z"),
        endDate: new Date("2023-11-17T01:27:08.417Z"),
        eventRepairer: {
          create: {
            userId: "REPAIRER"
          }
        }
      }
    });

    vi.mock("@clerk/nextjs");
  }, 90000);

  it("should return 1 event for REPAIRER", async () => {
    await testApiHandler({
      handler,
      requestPatcher(request) {
        (request as unknown as NextApiRequestWithUser).user = {
          id: "REPAIRER",
          firstName: "Mock",
          lastName: "User",
          emailAddress: "",
          role: UserRole.REPAIRER
        };
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await res.json();
        expect(result.items).toHaveLength(1);
      }
    });
  }, 90000);

  it("should return 2 events for other users", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const result = await res.json();
        expect(result.items).toHaveLength(2);
      }
    });
  });
});
