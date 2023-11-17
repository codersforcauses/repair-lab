import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup, seedTestData } from "@/../tests/utils";
import prisma from "@/lib/prisma";
import endpoint, { config } from "@/pages/api/event/[id]";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

describe("PATCH /api/event/:id", () => {
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

  it("should be able to update an event", async () => {
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
            status: "ONGOING"
          })
        });

        const updatedEvent = await prisma.event.findUnique({
          where: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" }
        });

        const expectedEvent = {
          id: "acf5ed50-19a2-11ee-be56-0242ac120002",
          createdBy: "mock user",
          location: "Curtin University",
          eventType: "Laptop",
          volunteers: ["Justin", "Spongebob"],
          name: "Updated Event",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: "ONGOING"
        };

        expect(res.status).toBe(200);
        expect(updatedEvent).toMatchObject(expectedEvent);
      }
    });
  });
});
