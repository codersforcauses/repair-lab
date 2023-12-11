import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/event";

import { cleanup, seedTestData } from "../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("POST /api/event", () => {
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
            startDate: new Date(),
            endDate: new Date()
          })
        });

        expect(res.status).toBe(400);
      }
    });
  });

  it("should be able to create an event", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: "New Event",
            location: "Subiaco, Perth",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            eventType: "Laptop",
            startDate: "2023-11-15T07:28:08+0000",
            endDate: "2023-11-15T08:28:08+0000"
          })
        });

        const result = await res.json();

        const createdEvent = await prisma.event.findUnique({
          where: { id: result.id }
        });

        const expectedEvent = {
          name: "New Event",
          location: "Subiaco, Perth",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          eventType: "Laptop",
          status: "UPCOMING",
          startDate: new Date("2023-11-15T07:28:08+0000"),
          endDate: new Date("2023-11-15T08:28:08+0000")
        };

        expect(res.status).equals(200);
        expect(createdEvent).toMatchObject(expectedEvent);
      }
    });
  });
});
