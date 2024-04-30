import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it } from "vitest";

import endpoint from "@/pages/api/item-type";

import { cleanup } from "../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("POST /api/item-type", () => {
  beforeAll(async () => {
    await cleanup();
  });

  it("should create an event", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const name = "car";
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name })
        });

        expect(res.status).toBe(200);
        const result: { name: string } = await res.json();
        expect(result.name).toEqual(name);
      }
    });
  });
});
