import { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/event/[id]/repairers";

import prisma from "../../../../../setup";
import { cleanup, seedTestData } from "../../../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("DELETE /api/event/[id]/repairers", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

    await prisma.event.create({
      data: {
        id: "acf5ed50-19a2-11ee-be56-0242ac120004",
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
        id: "88676ba2-8d86-49b1-9969-ba3997917575",
        userId: "Mock Repairer",
        eventId: "acf5ed50-19a2-11ee-be56-0242ac120004"
      }
    });

    vi.mock("@clerk/nextjs/server", async () => {
      return {
        getAuth: vi.fn().mockReturnValue({ userId: "Mock Repairer" })
      };
    });

    vi.mock("@clerk/nextjs");

    vi.mocked(clerkClient.users.getUser).mockImplementation(
      async (userId: string) => {
        return [
          {
            id: "Mock Repairer",
            firstName: "Mock",
            lastName: "Repairer",
            emailAddresses: [
              {
                emailAddress: "test@gmail.com"
              }
            ],
            publicMetadata: {
              role: "CLIENT"
            }
          }
        ].find((user) => user.id === userId) as unknown as User;
      }
    );
  });

  it.only("should be able to delete repairers from an event", async () => {
    await testApiHandler({
      handler,
      params: {
        id: "acf5ed50-19a2-11ee-be56-0242ac120004"
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: ["Mock Repairer"]
          })
        });

        expect(res.status).toBe(200);

        // TODO - Add more assertions after figuring out how to mock getting Clerk Users
      }
    });
  });
});
