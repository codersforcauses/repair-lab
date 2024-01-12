import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup, seedTestData } from "@/../tests/utils";
import endpoint from "@/pages/api/event/[id]/repairers";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event/:id/repairers", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();
    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");
  }, 50000);

  it("should return 404 if an event is not found", async () => {
    await testApiHandler({
      handler,
      params: { id: "NON_EXISTENT_ID" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        expect(res.status).toBe(404);
      }
    });
  });

  it("should be able to get event repairers and return json", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120002" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const expectedEvent = [
          {
            userId: "mock user",
            firstName: "test",
            lastName: "test",
            email: "test@gmail.com"
          },
          {
            userId: "test_empty",
            firstName: "",
            lastName: "",
            email: ""
          }
        ];

        const result = await res.json();

        expect(res.status).toBe(200);
        expect(result).toMatchObject(expectedEvent);
      }
    });
  });
});
