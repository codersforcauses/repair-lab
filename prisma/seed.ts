/* eslint-disable no-console */
import { faker } from "@faker-js/faker";
import { Brand, Event, ItemType, PrismaClient } from "@prisma/client";
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

async function createItemTypes(itemTypeNames: string[]) {
  const itemTypes: ItemType[] = [];
  for (const name of itemTypeNames) {
    const itemType = await prisma.itemType.create({
      data: { name },
    });
    itemTypes.push(itemType);
    console.log(itemType);
  }
  return itemTypes;
}

async function createBrands(brandNames: string[]) {
  const brands: Brand[] = [];
  for (const name of brandNames) {
    const brand = await prisma.brand.create({
      data: { name },
    });
    brands.push(brand);
    console.log(brand);
  }
  return brands;
}

async function createRandomEvents(count: number, itemTypeNames: string[]) {
  const events: Event[] = [];
  for (let i = 0; i < count; i++) {
    const event = await prisma.event.create({
      data: {
        createdBy: faker.person.fullName(),
        name: faker.commerce.productName(),
        location: faker.location.street(),
        description:
          faker.lorem.sentence(),
        volunteers: [faker.person.fullName()],
        event: {
          connect: { name: faker.helpers.arrayElement(itemTypeNames) }
        },
        startDate: new Date(2023, 5, 28, 15, 30, 0, 0),
        endDate: new Date(2023, 6, 1, 15, 30, 0, 0)
      },
    });
    events.push(event);
    console.log(event);
  }
  return events;
}

async function createRandomRepairRequest() {
  const repairRequest = await prisma.repairRequest.create({
    data: {
      createdBy: "Alice",
      assignedTo: "Cheshire Cat",
      event: {
        connect: { id: "event1.id" }
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
    },
  });
  console.log(repairRequest);
}

async function main() {
  faker.seed(0);

  const itemTypeNames: string[] = ["Clock", "Bike", "Computer"];
  const brandNames: string[] = ["Wonderland", "BikeBrand", "OtherBikeBrand"];

  await deleteAllData();

  const itemTypes = await createItemTypes(itemTypeNames);
  const brands = await createBrands(brandNames);
  const events = await createRandomEvents(30, itemTypeNames);
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
