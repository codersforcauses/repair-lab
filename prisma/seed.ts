/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // repairRequestImage(s) created by default user(s)
  await prisma.repairRequestImage.deleteMany({
    where: {
      repairRequest: {
        OR: [
          { createdBy: "Alice" },
          { createdBy: "Charlie" },
          { createdBy: "David" }
        ]
      }
    }
  });

  // delete repairRequest(s) created by default user(s)
  // possibly linked to default event(s)
  await prisma.repairRequest.deleteMany({
    where: {
      OR: [
        { createdBy: "Alice" },
        { createdBy: "Charlie" },
        { createdBy: "David" }
      ]
    }
  });
  console.log("Deleted default RepairRequest records.");

  // create default itemType(s)
  const clockItemType = await prisma.itemType.upsert({
    where: { name: "Clock" },
    create: { name: "Clock" },
    update: {}
  });
  console.log(clockItemType);

  // create default brand(s)
  const wonderlandBrand = await prisma.brand.upsert({
    where: { name: "Wonderland" },
    create: { name: "Wonderland" },
    update: {}
  });
  console.log(wonderlandBrand);

  // create default event(s)
  const event1 = await prisma.event.upsert({
    where: { name: "Can Bob Fix It?" },
    create: {
      createdBy: "Bob (The) Builder",
      name: "Can Bob Fix It?",
      location: "Bobsville",
      description:
        "A general contractor from Bobsville provides his services in Bobsville.",
      volunteers: ["Cheshire Cat"],
      event: {
        connect: { name: "Clock" }
      },
      startDate: new Date(2023, 5, 28, 15, 30, 0, 0),
      endDate: new Date(2023, 6, 1, 15, 30, 0, 0)
    },
    update: {}
  });
  console.log({ event1 });

  // create default repairRequest(s)
  const repairRequest1 = await prisma.repairRequest.create({
    data: {
      createdBy: "Alice",
      assignedTo: "Cheshire Cat",
      event: {
        connect: { id: event1.id }
      },
      status: "PENDING",
      description: "Clock stopped ticking",
      comment: "Clock starts to tick for 3 seconds after it has been shaken.",
      requestDate: new Date(),
      updatedAt: new Date(),
      item: {
        connect: { name: "Clock" }
      },
      brand: {
        // TODO: Needs to be able to insert new brand if not in db already
        connect: { name: "Wonderland" }
      },
      images: {
        create: [
          {
            s3Key: "https://tinyurl.com/broken-clock-sad"
          },
          {
            s3Key: "https://tinyurl.com/broken-clock-sad"
          }
        ]
      }
    }
  });

  console.log(repairRequest1);

  const repairRequest2 = await prisma.repairRequest.create({
    data: {
      createdBy: "Charlie",
      assignedTo: "Cheshire Cat",
      event: {
        connect: { id: event1.id }
      },
      status: "PENDING",
      description: "Clock Shattered",
      comment: "The clock was dropped and glass shattered.",
      requestDate: new Date(),
      updatedAt: new Date(),
      item: {
        connect: { name: "Clock" }
      },
      brand: {
        // TODO: Needs to be able to insert new brand if not in db already
        connect: { name: "Wonderland" }
      },
      images: {
        create: [
          {
            s3Key: "https://tinyurl.com/broken-clock-sad"
          },
          {
            s3Key: "https://tinyurl.com/broken-clock-sad"
          }
        ]
      }
    }
  });
  console.log(repairRequest2);

  const repairRequest3 = await prisma.repairRequest.create({
    data: {
      createdBy: "David",
      assignedTo: "Cheshire Cat",
      event: {
        connect: { id: event1.id }
      },
      status: "PENDING",
      description: "Clock blew up",
      comment: "The clock exploded.",
      requestDate: new Date(),
      updatedAt: new Date(),
      item: {
        connect: { name: "Clock" }
      },
      brand: {
        // TODO: Needs to be able to insert new brand if not in db already
        connect: { name: "Wonderland" }
      },
      images: {
        create: [
          {
            s3Key: "https://tinyurl.com/broken-clock-sad"
          },
          {
            s3Key: "https://tinyurl.com/broken-clock-sad"
          }
        ]
      }
    }
  });
  console.log(repairRequest3);

  // TODO: Explore generating fake data with faker (Automated Approach)
  // TODO: Add fake data to seed.ts
  // OR, Manually:
  // TODO: Create 1 extra event (At least 2 events)
}

main()
  .then(async () => {
    console.log("Database seeding completed successfully.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
