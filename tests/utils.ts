// eslint-disable-next-line simple-import-sort/imports

import type { NextApiHandler } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { exec } from "node:child_process";
import { expect } from "vitest";

import { PaginationResponse } from "@/lib/pagination";
import prisma from "@/lib/prisma";

export const cleanup = async () => {
  await resetDatabase();
};

const resetDatabase = () => {
  return new Promise((resolve, reject) => {
    exec("npx prisma db push --force-reset", (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

export const teardown = async () => {
  await cleanup().then(() => prisma.$disconnect());
};

export const seedTestData = async () => {
  await prisma.brand.create({
    data: {
      name: "Apple"
    }
  });

  await prisma.itemType.create({
    data: {
      name: "Laptop"
    }
  });

  await prisma.event.create({
    data: {
      id: "acf5ed50-19a2-11ee-be56-0242ac120002",
      createdBy: "mock user",
      name: "Laptop Repair Event",
      location: "Curtin University",
      eventType: "Laptop",
      description: "Laptop repair event.",
      disclaimer: "This is a disclaimer",
      startDate: new Date("2023-11-16T01:27:08.417Z"),
      endDate: new Date("2023-11-17T01:27:08.417Z")
    }
  });

  await prisma.repairRequest.create({
    data: {
      id: "56005d72-2614-11ee-be56-0242ac120002",
      createdBy: "mock user",
      eventId: "acf5ed50-19a2-11ee-be56-0242ac120002",
      description: "My laptop is broken",
      itemType: "Laptop",
      itemBrand: "Apple",
      comment: "Some comment",
      thumbnailImage: ""
    }
  });
};

// Test helpers

/**
 * Tests a GET API route that returns a PaginationResponse of objects with an **id** field.
 * Only tests the IDs, not other properties.
 * @param handler A NextApiHandler
 * @param params The URL search params
 * @param expectedIDs The list of IDs to be returned in order
 */
export async function testPaginationResponse<
  T extends Record<string, string | string[]>
>(handler: NextApiHandler, params: T, expectedIDs: string[]) {
  await testApiHandler({
    handler,
    params,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const results: PaginationResponse<unknown> = await res.json();
      expect(res.status).toBe(200);
      expect(results.items.length).toBe(expectedIDs.length);
      results.items.forEach((result, index) => {
        expect(result).toHaveProperty("id", expectedIDs[index]);
      });
    }
  });
}

/**
 * Tests a GET API route against a response code
 * @param handler  A NextApiHandler
 * @param params The URL search params
 * @param code The expected HTTP code to be returned. Default 400
 */
export async function testResponseCode<
  T extends Record<string, string | string[]>
>(handler: NextApiHandler, params: T, code: number = 400) {
  await testApiHandler({
    handler,
    params,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      expect(res.status).toBe(code);
    }
  });
}
