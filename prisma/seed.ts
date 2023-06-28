import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // delete repairRequest(s) created by default user(s)
  // possibly linked to default event(s)
  await prisma.repairRequest.deleteMany({
    where: {
      createdBy: "Alice"
    }
  });
  console.log("Deleted default RepairRequest records.");

  // delete default event(s)
  await prisma.event.deleteMany({
    where: {
      name: "Can Bob Fix It?"
    }
  });
  console.log("Deleted default Event records.");

  const event1 = await prisma.event.upsert({
    where: { name: "Can Bob Fix It?" },
    create: {
      createdBy: "Bob (The) Builder",
      name: "Can Bob Fix It?",
      location: "Bobsville",
      description:
        "A general contractor from Bobsville provides his services in Bobsville.",
      volunteers: [],
      startDate: new Date(2023, 5, 28, 15, 30, 0, 0),
      endDate: new Date(2023, 6, 1, 15, 30, 0, 0)
    },
    update: {}
  });
  console.log({ event1 });

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

  const repairRequest = await prisma.repairRequest.create({
    data: {
      event: {
        connect: { id: event1.id }
      },
      createdBy: "Alice",
      status: "PENDING",
      description: "Clock stopped ticking",
      requestDate: new Date(),
      item: {
        connect: { name: clockItemType.name }
      },
      brand: {
        connect: { name: wonderlandBrand.name }
      }
    }
  });

  console.log(repairRequest);
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
