import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";

import endpoint, { config } from "@/pages/api/repair-request";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

describe("POST /api/repair-request", () => {
  it("should return 400 status code on invalid fields", async () => {
    await testApiHandler({
      handler,
      url: "/",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify({
            invalid: "I am an invalid body"
          })
        });

        expect(res.status).toBe(400);
      }
    });
  });
});
