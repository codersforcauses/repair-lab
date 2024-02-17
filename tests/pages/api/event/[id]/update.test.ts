import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup, seedTestData } from "@/../tests/utils";
import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/event/[id]";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("PATCH /api/event/:id", () => {
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
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            description: "1",
            startDate: "not_a_date",
            endDate: "not_a_date",
            status: "not_a_valid_status"
          })
        });

        expect(res.status).toBe(400);
      }
    });
  });

  it("should return 404 if an existing event is not found", async () => {
    await testApiHandler({
      handler,
      params: { id: "NON_EXISTENT_ID" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: "New Event"
          })
        });

        expect(res.status).toBe(404);
      }
    });
  });

  it("should be able to update an event with event images", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: "Updated Event",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            status: "ONGOING",
            images: ["FakeimageURL1.jpg", "FakeimageURL2.jpg"]
          })
        });

        const updatedEvent = await prisma.event.findUnique({
          where: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
          include: {
            images: true
          }
        });

        const expectedEvent = {
          id: "acf5ed50-19a2-11ee-be56-0242ac120002",
          createdBy: "mock user",
          location: "Curtin University",
          eventType: "Laptop",
          name: "Updated Event",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: "ONGOING",
          images: [
            {
              repairEventId: "acf5ed50-19a2-11ee-be56-0242ac120002",
              s3Key: "FakeimageURL1.jpg"
            },
            {
              repairEventId: "acf5ed50-19a2-11ee-be56-0242ac120002",
              s3Key: "FakeimageURL2.jpg"
            }
          ]
        };

        expect(res.status).toBe(200);
        expect(updatedEvent).toMatchObject(expectedEvent);
      }
    });
  });
});
