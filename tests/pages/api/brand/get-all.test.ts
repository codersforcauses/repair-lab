import type { PageConfig } from "next";
import { beforeAll, describe, expect, it } from "vitest";

import prisma from "@/lib/prisma";
import endpoint from "@/pages/api/brand";
import { cleanup, testApiHandler } from "@@/tests/utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/brand", () => {
  beforeAll(async () => {
    await cleanup();

    await prisma.brand.createMany({
      data: [{ name: "Apple" }, { name: "Samsung" }]
    });
  });

  it("should return brands", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        expect(res.status).toBe(200);
        const result = await res.json();
        expect(result.length).equals(2);
        expect(result[0].name).equals("Apple");
        expect(result[1].name).equals("Samsung");
      }
    });
  });
});
