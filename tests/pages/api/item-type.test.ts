import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it } from "vitest";

import prisma from "@/lib/prisma";
import endpoint, { config } from "@/pages/api/item-type";

import { cleanup } from "../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

describe("GET /api/item-type", () => {
  beforeAll(async () => {
    await cleanup();

    await prisma.itemType.createMany({
      data: [{ name: "Bike" }, { name: "Phone" }]
    });
  });

  it("should return item types", async () => {
    await testApiHandler({
      handler,
      url: "/",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        expect(res.status).toBe(200);
        const result = await res.json();

        expect(result[0].name).equals("Bike");
        expect(result[1].name).equals("Phone");
      }
    });
  });
});
