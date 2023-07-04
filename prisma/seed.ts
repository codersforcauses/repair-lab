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
          { createdBy: "David" },
          { createdBy: "Greg" },
          { createdBy: "Ivan" },
          { createdBy: "Larry" }
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
        { createdBy: "David" },
        { createdBy: "Greg" },
        { createdBy: "Ivan" },
        { createdBy: "Larry" }
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

  const bikeItemType = await prisma.itemType.upsert({
    where: { name: "Bike" },
    create: { name: "Bike" },
    update: {}
  });
  console.log(bikeItemType);

  // create default brand(s)
  const wonderlandBrand = await prisma.brand.upsert({
    where: { name: "Wonderland" },
    create: { name: "Wonderland" },
    update: {}
  });
  console.log(wonderlandBrand);

  const OtherBikeBrand = await prisma.brand.upsert({
    where: { name: "OtherBikeBrand" },
    create: { name: "OtherBikeBrand" },
    update: {}
  });
  console.log(OtherBikeBrand);

  const BikeBrand = await prisma.brand.upsert({
    where: { name: "BikeBrand" },
    create: { name: "BikeBrand" },
    update: {}
  });
  console.log(BikeBrand);

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
      itemBrand: "Wonderland",
      requestDate: new Date(),
      updatedAt: new Date(),
      item: {
        connect: { name: "Clock" }
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
      itemBrand: "Wonderland",
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
      itemBrand: "Wonderland",
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

  const event2 = await prisma.event.upsert({
    where: { name: "Evans' Repair Warehouse" },
    create: {
      createdBy: "Evans",
      name: "Evans' Repair Warehouse",
      location: "The big warehouse on 5th st",
      description: "Evans fixes bikes & trikes",
      volunteers: ["Fred", "Gerald", "Harold"],
      event: {
        connect: { name: "Bike" }
      },
      startDate: new Date(2023, 8, 12, 15, 30, 0, 0),
      endDate: new Date(2023, 8, 15, 15, 30, 0, 0)
    },
    update: {}
  });
  console.log(event2);

  const repairRequest4 = await prisma.repairRequest.create({
    data: {
      createdBy: "Greg",
      assignedTo: "Fred",
      event: {
        connect: { id: event2.id }
      },
      status: "PENDING",
      description: "My bike chain came out",
      comment: "Pls fix it for me Evan!",
      requestDate: new Date(),
      updatedAt: new Date(),
      item: {
        connect: { name: "Bike" }
      },
      itemBrand: "Wonderland",
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
  console.log(repairRequest4);

  const repairRequest5 = await prisma.repairRequest.create({
    data: {
      createdBy: "Ivan",
      assignedTo: "Gerald",
      event: {
        connect: { id: event2.id }
      },
      status: "PENDING",
      description: "Brake is not working",
      comment: "Please repair my brakes m8.",
      requestDate: new Date(),
      updatedAt: new Date(),
      item: {
        connect: { name: "Bike" }
      },
      itemBrand: "OtherBikeBrand",
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
  console.log(repairRequest5);

  const repairRequest6 = await prisma.repairRequest.create({
    data: {
      createdBy: "Larry",
      assignedTo: "Harold",
      event: {
        connect: { id: event2.id }
      },
      status: "PENDING",
      description: "Cant adjust seat height",
      comment: "Idk how to adjust seat height",
      requestDate: new Date(),
      updatedAt: new Date(),
      item: {
        connect: { name: "Bike" }
      },
      itemBrand: "BikeBrand",
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
  console.log(repairRequest6);

  // TODO: Explore generating fake data with faker (Automated Approach)
  // TODO: Add fake data to seed.ts
  // OR, Manually:
  // TODO: Create 1 extra event (At least 2 events)[DONE]
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
