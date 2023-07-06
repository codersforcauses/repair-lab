import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { cleanup } from "../../utils";
import { teardown } from "../../utils";
import prisma from "../../../src/lib/prisma";
import endpoint, { config } from "../../../src/pages/api/hello";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

describe("/api/hello", () => {
  beforeAll(async () => {
    await cleanup();
    await prisma.itemType.create({
      data: {
        name: "Test Item Type 2"
      }
    });
    await prisma.event.create({
      data: {
        createdBy: "test",
        name: "Test Event ",
        location: "Test Location",
        description: "This is a test event",
        volunteers: [],
        eventType: "Test Item Type",
        startDate: new Date(),
        endDate: new Date()
      }
    });
  });

  it("should send events from the database", async () => {
    await testApiHandler({
      handler,
      url: `/?name=Test%20Event%203`,
      test: async ({ fetch }) => {
        const res = await fetch({ method: "GET" });
        const body = await res.json();

        console.log(body);

        expect(res.status).to.equal(200);
        expect(body).to.exist;
      }
    });
  });

  it("should NOT send events from the database", async () => {
    await testApiHandler({
      handler,
      url: `/?name=Dummy`,
      test: async ({ fetch }) => {
        const res = await fetch({ method: "GET" });
        const body = await res.json();

        console.log(body);

        expect(res.status).to.equal(200);
        expect(body).to.exist;
      }
    });
  });

  afterAll(() => {
    teardown();
  });
});
