import type { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { RepairRequest } from "@prisma/client";
import { beforeAll, describe, expect, it, vi } from "vitest";

import endpoint from "@/pages/api/repair-request";
import { formatDate } from "@/utils/format-date";

import prisma from "../../../../src/lib/prisma";
import userService from "../../../../src/services/user";
import { cleanup, seedTestData } from "../../../utils";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("POST /api/repair-request", () => {
  beforeAll(async () => {
    await cleanup();
    await seedTestData();
    vi.mock("@clerk/nextjs/server");
    vi.mock("@clerk/nextjs");
  });

  it("should return 400 status code on invalid fields", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            eventId: Number(1234),
            itemBrand: "",
            description: "asd"
          })
        });

        expect(res.status).toBe(400);
      }
    });
  });

  it("should be able to create a repair request", async () => {
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
            description: "My Macbook screen came off",
            itemBrand: "Apple",
            comment: "Help please."
          })
        });

        expect(res.status).equals(200);

        const result = await res.json();
        const repairRequestId = result.id;

        const expectedRepairRequest: RepairRequest | null =
          await prisma.repairRequest.findUnique({
            where: {
              id: repairRequestId
            }
          });

        expect(expectedRepairRequest?.eventId).equals(
          "acf5ed50-19a2-11ee-be56-0242ac120002"
        );
        expect(expectedRepairRequest?.itemType).equals("Laptop");
        expect(expectedRepairRequest?.description).equals(
          "My Macbook screen came off"
        );
        expect(expectedRepairRequest?.itemBrand).equals("Apple");
        expect(expectedRepairRequest?.comment).equals("Help please.");
      }
    });
  });

  it.skip("should be able to recieve a mock email", async () => {
    const testCustomer = {
      id: "email_testing",
      firstName: "Email",
      lastName: "Testing",
      // change to the email address where you want to receive the emails
      // please note that receiving actual SES emails requires using a verified email address in AWS
      emailAddress: "test@gmail.com"
    };

    const testRepairInfo = {
      eventId: "acf5ed50-19a2-11ee-be56-0242ac120002",
      itemType: "Laptop",
      description: "Test Repair Request Confirmation Email",
      itemBrand: "Repair Request Confirmation",
      comment: "Use mock email sevice in test environment."
    };

    vi.mock("@clerk/nextjs/server", async () => {
      return {
        getAuth: vi.fn().mockReturnValue({ userId: "email_testing" })
      };
    });

    vi.mock("../../../../src/services/user");

    vi.mocked(userService.getUser).mockReturnValue(
      Promise.resolve({
        id: testCustomer.id,
        firstName: testCustomer.firstName,
        lastName: testCustomer.lastName,
        emailAddress: testCustomer.emailAddress,
        role: "CLIENT"
      })
    );

    async function getMockEmails() {
      return fetch("http://localhost:8005/store").then((res) => res.json());
    }

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(testRepairInfo)
        });

        // check the api return status
        expect(res.status).toBe(200);

        // check email data
        const resResult = await res.json();

        const event = await prisma.event.findUnique({
          where: { id: testRepairInfo.eventId }
        });

        const expectedEmailInfo = {
          from: process.env.AWS_SES_SOURCE_EMAIL,
          to: testCustomer.emailAddress,
          customerName: testCustomer.firstName + " " + testCustomer.lastName,
          repairId: resResult.id,
          requireDate: formatDate(new Date().toDateString()),
          itemName: testRepairInfo.itemType,
          descrition: testRepairInfo.description,
          estimatedRepairDate: formatDate(event?.endDate.toDateString() || "")
        };

        // wait for the mock email generated
        await new Promise((resolve) => {
          setTimeout(resolve, 8000);
        });

        const mockRes = await getMockEmails();

        // get the lastest mock email
        type MockEmail = {
          messageId: string;
          from: string;
          destination: {
            to: string[];
          };
          body: {
            html: string;
          };
          subject: string;
          at: number;
        };

        const mockEmail = mockRes.emails.sort(
          (a: MockEmail, b: MockEmail) => b.at - a.at
        )[0];
        const htmlString = mockEmail.body.html;

        const mockEmailInfo = {
          from: mockEmail.from,
          to: mockEmail.destination.to[0],
          customerName: htmlString.match("Hello\\s*([^<]*)")[1].split(",")[0],
          repairId: htmlString.match("Request ID: *([^<]*)")[1],
          requireDate: htmlString.match("Date of Request: *([^<]*)")[1],
          itemName: htmlString.match("Product/Item: *([^<]*)")[1],
          descrition: htmlString.match("Issue Description: *([^<]*)")[1],
          estimatedRepairDate: htmlString
            .match("Estimated Repair Date: *([^<]*)")[1]
            .split(" ")[0]
        };

        expect(mockEmailInfo).toMatchObject(expectedEmailInfo);
      }
    });
  });
}, 10000);
