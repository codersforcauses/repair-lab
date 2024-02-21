import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it } from "vitest";

import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/item-type";

import { cleanup } from "../../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("DELETE /api/item-type/:id", () => {
  const name = "Bike";
  beforeAll(async () => {
    await cleanup();
    await prisma.itemType.createMany({
      data: [{ name }]
    });
  });

  it("should delete an event", async () => {
    await testApiHandler({
      handler,
      params: { name },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
        expect(res.status).toBe(200);
        const result: { name: string } = await res.json();
        expect(result.name).toEqual(name);
      }
    });
  });
  it("should fail to  delete an event on invalid fields", async () => {
    await testApiHandler({
      handler,
      params: { name },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
        expect(res.status).toBe(404);
      }
    });
  });
});
