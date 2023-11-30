import { exec } from "node:child_process";

import prisma from "./setup";

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
      volunteers: ["user_1", "user_2"],
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

export const mockClerkUsers = [
  {
    id: "mock user",
    firstName: "test",
    lastName: "test",
    emailAddresses: [{ emailAddress: "test@gmail.com" }],
    publicMetadata: {
      role: "CLIENT"
    }
  },
  {
    id: "user_1",
    firstName: "Justin",
    lastName: "",
    emailAddresses: [{ emailAddress: "justin@gmail.com" }],
    publicMetadata: {
      role: "CLIENT"
    }
  },
  {
    id: "user_2",
    firstName: "Spongebob",
    lastName: "",
    emailAddresses: [{ emailAddress: "spongebob@gmail.com" }],
    publicMetadata: {
      role: "CLIENT"
    }
  }
];
