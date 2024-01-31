import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/repair-request";

import userService from "../../../../src/services/user";
import { cleanup, seedTestData } from "../../../utils";

const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("sending repair request confimation emails", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();

    vi.mock("@clerk/nextjs/server", async () => {
      return {
        getAuth: vi.fn().mockReturnValue({ userId: "email_testing" })
      };
    });

    vi.mock("@clerk/nextjs");

    vi.mock("../../../../src/services/user");
  });

  it("should be able to recieve an email", async () => {
    vi.mocked(userService.getUser).mockReturnValue(
      Promise.resolve({
        id: "email_testing",
        firstName: "Email",
        lastName: "Testing",
        // change to the email address where you want to receive the emails
        // please note that receiving actual SES emails requires using a verified email address in AWS
        emailAddress: "test0@gmail.com",
        role: "CLIENT"
      })
    );

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            eventId: "acf5ed50-19a2-11ee-be56-0242ac120002",
            itemType: "Laptop",
            description: "Test Repair Request Confirmation Email",
            itemBrand: "Repair Request Confirmation",
            comment: "Use mock email sevice in test environment."
          })
        });

        await new Promise((resolve) => {
          setTimeout(resolve, 8000);
        });

        expect(res.status).equals(200);
      }
    });
  });
}, 10000);
