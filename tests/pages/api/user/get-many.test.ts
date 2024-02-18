import { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { clerkClient } from "@clerk/nextjs";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/user";

import prisma from "../../../setup";
import { cleanup, seedTestData } from "../../../utils";
// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/users", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");

    await prisma.staff.createMany({
      data: [
        {
          clerkId: "Test",
          role: "EVENT_MANAGER"
        },
        {
          clerkId: "mock user",
          role: "EVENT_MANAGER"
        }
      ]
    });
  });

  it("should be able to get users", async () => {
    await testApiHandler({
      handler,
      params: { page: "1", perPage: "5" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await res.json();

        expect(res.status).toBe(200);
        expect(clerkClient.users.getUserList).toBeCalledWith({
          orderBy: "-created_at",
          limit: 5,
          offset: (1 - 1) * 5,
          query: "",
          userId: undefined
        });
        expect(result.meta).toMatchObject({
          perPage: 5,
          lastPage: 1,
          page: 1,
          totalCount: 5
        });
        expect(result.items).toContainEqual({
          id: "Test",
          emailAddress: "spongebob@gmail.com",
          firstName: "Spongebob",
          lastName: "",
          role: "EVENT_MANAGER"
        });
      }
    });
  });

  it("should be able to filter by roles", () => {});

  it("should only allow filter by staff roles", async () => {});
});
