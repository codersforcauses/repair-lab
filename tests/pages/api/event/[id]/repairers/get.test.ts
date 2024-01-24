import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup, seedTestData } from "@/../tests/utils";
import endpoint from "@/pages/api/event/[id]/repairers";

const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event/:id/repairers", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();
    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");
  });

  it("have matched event, repariers, should be able to return valid ones ", async () => {
    await testApiHandler({
      handler,
      params: { id: "acf5ed50-19a2-11ee-be56-0242ac120003" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const expectedRepairers = [
          {
            userId: "mock user",
            firstName: "test",
            lastName: "test",
            email: "test@gmail.com"
          }
        ];

        const result = await res.json();

        expect(res.status).toBe(200);
        expect(result).toMatchObject(expectedRepairers);
      }
    });
  });

  it("no matched event repairers, should be able to return an empty array ", async () => {
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
