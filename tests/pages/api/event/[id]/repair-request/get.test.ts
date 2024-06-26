import type { PageConfig } from "next";
import { beforeAll, describe, it, vi } from "vitest";

import {
  cleanup,
  testPaginationResponse,
  testResponseCode
} from "@/../tests/utils";
import endpoint from "@/pages/api/event/[id]/repair-request";

import { seedTestData } from "./mock-data";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("GET /api/event", () => {
  beforeAll(async () => {
    await cleanup();
    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");

    await seedTestData();
  });
  type AllowedParams = {
    id?: string;
    sortKey?: string;
    sortMethod?: string;
    searchWord?: string;
    itemType?: string | string[];
    itemBrand?: string | string[];
    assignedTo?: string | string[];
    page?: string;
    perPage?: string;
  };

  // RETURNS CORRECT VALUES
  it("should be able to get repair requests", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1" },
      [1, 2]
    );
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-2" },
      [3, 4]
    );
  });

  it("should be able to filter repair requests by searching description", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", searchWord: "eggplant" },
      [2]
    );
  });

  it("should be able to filter repair requests by searching user", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", searchWord: "Justin" },
      [1, 2]
    );
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-2", searchWord: "spongebob" },
      [3]
    );
  });

  it("should be able to filter repair requests by brand", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", searchWord: "Justin" },
      [1, 2]
    );
  });

  it("should be able to filter repair requests by item type", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", itemType: "Laptop" },
      [1]
    );
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-2", itemType: "Laptop" },
      [3, 4]
    );
  });

  it("should be able to filter repair requests by assignee", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", assignedTo: "user_2" },
      [1]
    );
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", assignedTo: "unassigned" },
      [2]
    );
  });

  it("should return all repair requests when empty filter provided", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", itemType: "" },
      [1, 2]
    );
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", itemBrand: "" },
      [1, 2]
    );
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-2", itemBrand: "" },
      [3, 4]
    );
  });

  it("should return paginated response", async () => {
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", searchWord: "Justin", perPage: "1", page: "1" },
      [1]
    );
    await testPaginationResponse<AllowedParams>(
      handler,
      { id: "ev-1", searchWord: "Justin", perPage: "1", page: "2" },
      [2]
    );
  });

  // CORRECTLY FAILS
  it("should return 400 if no event id passed", async () => {
    await testResponseCode<AllowedParams>(handler, {
      searchWord: "eggplant"
    });
  });

  it("should return 404 if no event is found", async () => {
    await testResponseCode<AllowedParams>(handler, { id: "ev-3" }, 404);
  });

  it("should return 400 if invalid sorting", async () => {
    await testResponseCode<AllowedParams>(handler, {
      sortKey: "WOOHOO"
    });
    await testResponseCode<AllowedParams>(handler, {
      sortMethod: "WOOHOO"
    });
    // in the schema, but not a valid key
    await testResponseCode<AllowedParams>(handler, {
      sortKey: "createdBy"
    });
  });
});
