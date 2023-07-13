/* eslint-disable no-console */
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function deleteAllData() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
  } catch (error) {
    console.log({ error })
  }
}

async function createItemType(name: string) {
  const itemType = await prisma.itemType.create({
    data: { name },
  });
  console.log(itemType);
  return itemType;
}

async function createBrand(name: string) {
  const brand = await prisma.brand.create({
    data: { name },
  });
  console.log(brand);
  return brand;
}

async function createRandomEvent() {
  const event = await prisma.event.create({
    data: {
      createdBy: faker.person.fullName(),
      name: faker.commerce.productName(),
      location: faker.location.street(),
      description:
        faker.lorem.sentence(),
      volunteers: [faker.person.fullName()],
      event: {
        connect: { name: faker.helpers.arrayElement(["Clock", "Bike"]) }
      },
      startDate: new Date(2023, 5, 28, 15, 30, 0, 0),
      endDate: new Date(2023, 6, 1, 15, 30, 0, 0)
    },
  });
  console.log(event);
  return event;
}

async function main() {
  faker.seed(100);

  await deleteAllData();

  await Promise.all([
    createItemType("Clock"),
    createItemType("Bike"),
    createItemType("Computer"),

    createBrand("Wonderland"),
    createBrand("BikeBrand"),
    createBrand("OtherBikeBrand")
  ]);

  // create default event(s)
  const event1 = await createRandomEvent();
  const event2 = await createRandomEvent();
  const event3 = await createRandomEvent();
  const event4 = await createRandomEvent();
  const event5 = await createRandomEvent();

  // create default repairRequest(s)
  const repairRequest1 = await prisma.repairRequest.create({
    data: {
      id: "40e22917-5649-4dca-aae5-c2bb3d20303a",
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
      thumbnailImage: "https://tinyurl.com/broken-clock-sad",
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
      id: "f7dc6714-043a-4a7e-9639-a43d3e5ad2cc",
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
      thumbnailImage: "https://tinyurl.com/broken-clock-sad",
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
      id: "3de8cb33-7406-4317-962c-83617095b9b1",
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
      thumbnailImage: "https://tinyurl.com/broken-clock-sad",
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

  const repairRequest4 = await prisma.repairRequest.create({
    data: {
      id: "42fdbf91-e066-49be-8b60-86439f5c97a5",
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
      thumbnailImage: "https://tinyurl.com/broken-clock-sad",
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
      id: "2e38f35a-7a16-4bd5-bbb9-b511def55ffe",
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
      thumbnailImage: "https://tinyurl.com/broken-clock-sad",
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
      id: "594ea3f3-4091-438b-8495-0724be3d9060",
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
      thumbnailImage: "https://tinyurl.com/broken-clock-sad",
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
