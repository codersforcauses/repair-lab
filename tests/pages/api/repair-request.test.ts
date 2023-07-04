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

describe("/api/dashboard/repair-request", () => {
  beforeAll(async () => {
    await cleanup();
    await prisma.itemType.create({
      data: {
        name: "Test Item Type"
      }
    });
    await prisma.repairRequest.create({
      data: {
        createdBy: "Test",
        assignedTo: "Test",
        eventId: "Test1",
        status: "PENDING",
        description: "Test Repair",
        comment: "test",
        spareParts: "test",
        requestDate: "2023-07-04T00:00:00",
        updatedAt: "2023-07-04T00:00:00",
        itemType: "Test",
        itemBrand: "Test",
        itemMaterial: "Test"
      }
    });
  });

  it("should send events from the database", async () => {
    await testApiHandler({
      handler,
      url: `/?description=Test%Repair`,
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
      url: `/?description=Dummy`,
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
