import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, it, vi } from "vitest";

//
import endpoint from "@/pages/api/event";
import { UserRole } from "@/types";
import { clerkClient } from "@clerk/nextjs";
import { cleanup, seedTestData } from "../../../utils";
import userService from "@/services/user";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
describe("GET /api/event", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

    vi.mock("@clerk/nextjs/server", () => {
      return {
        getAuth: vi
          .fn()
          .mockReturnValueOnce({ userId: "Test" })
          .mockReturnValueOnce({ userId: "REPAIRER" })
      };
    });
    vi.mock("@clerk/nextjs");
  
  }, 90000);

  it("should return 1 event for REPAIRER", async () => {
    clerkClient.users.getUser("user_2")
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
      }
    });
  }, 90000);
  it("should return 2 events for ADMIN", async () => {
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
      }
    });
  });
});
