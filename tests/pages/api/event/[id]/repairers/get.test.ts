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

    vi.mock("@clerk/nextjs/server", () => {
      return {
        getAuth: vi.fn().mockReturnValue({ userId: "Test" })
      };
    });
  });

  it("should be able to get an empty array of not exists event", async () => {
    await testApiHandler({
      handler,
      params: { id: "test_event_repairers" },
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

  it("should be able to get an array of repairers", async () => {
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

        const result = await res.json();

        const expectedResult = [
          {
            userId: "user_2YwY1mwVezd3hBl5gumC03gxIBT",
            firstName: "Tong",
            lastName: "Lam",
            email: "bluedragon00000@gmail.com"
          },
          {
            userId: "user_2ZFoJ0ZhsYpkFClPc5VsL7C6Mp4",
            firstName: "Qitong",
            lastName: "Lan",
            email: "qitonglan@gmail.com"
          },
          {
            userId: "test_empty",
            firstName: "",
            lastName: "",
            email: ""
          }
        ];

        expect(res.status).toBe(200);
        expect(result).toMatchObject(expectedResult);
      }
    });
  });
});
