import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup, seedTestData } from "@/../tests/utils";
import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/event/[id]/repairers";

const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event/:id/repairers", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

    await prisma.event.create({
      data: {
        id: "ev-1",
        createdBy: "Mock Repairer",
        name: "Test Laptop Repair Event",
        location: "Curtin University",
        eventType: "Laptop",
        description: "Test Laptop repair event.",
        disclaimer: "This is a disclaimer",
        startDate: new Date("2024-01-24T01:27:08.417Z"),
        endDate: new Date("2024-01-24T01:27:08.417Z")
      }
    });

    await prisma.eventRepairer.create({
      data: {
        userId: "Mock Repairer",
        eventId: "ev-1"
      }
    });

    await prisma.repairRequest.create({
      data: {
        eventId: "ev-1",
        description: "Test Laptop repair event.",
        itemType: "Laptop",
        itemBrand: "Dell",
        status: "ACCEPTED",
        assignedTo: "Mock Repairer",
        createdBy: "Mock Client"
      }
    });

    vi.mock("@clerk/nextjs/server", async () => {
      return {
        getAuth: vi.fn().mockReturnValue({ userId: "Mock Repairer" })
      };
    });

    vi.mock("@clerk/nextjs");

    vi.mocked(clerkClient.users.getUserList).mockReturnValue(
      Promise.resolve([
        {
          id: "Mock Repairer",
          firstName: "Mock",
          lastName: "Repairer",
          imageUrl: "https://example.com/image.jpg",
          emailAddresses: [
            {
              emailAddress: "test@gmail.com"
            }
          ],
          publicMetadata: {
            role: "CLIENT"
          }
        }
      ] as unknown as User[])
    );
  });

  it("should be able to return repairers for a valid event id", async () => {
    await testApiHandler({
      handler,
      params: { id: "ev-1" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await res.json();

        expect(res.status).toBe(200);
        expect(result).toMatchObject([
          {
            id: "Mock Repairer",
            firstName: "Mock",
            lastName: "Repairer",
            emailAddress: "test@gmail.com",
            role: "CLIENT",
            imageUrl: "https://example.com/image.jpg",
            acceptedTasksCount: 1
          }
        ]);
      }
    });
  });

  it("should return an empty array if the event doesn't exist", async () => {
    await testApiHandler({
      handler,
      params: { id: "not-exists" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await res.json();

        expect(res.status).toBe(200);
        expect(result).toMatchObject([]);
      }
    });
  });
});
