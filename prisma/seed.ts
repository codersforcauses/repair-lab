import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const eventNonDefaultFilled = await prisma.event.upsert({
    where: { name: "Can Bob Fix It?" },
    update: { name: "Can Bob Fix It? [UPDATED]" },
    create: {
      createdBy: "Bob (The) Builder",

      name: "Can Bob Fix It?",
      location: "Bobsville",
      description:
        "A general contractor from Bobsville provides his services in Bobsville.",
      volunteers: [],

      startDate: new Date(2023, 5, 28, 15, 30, 0, 0),
      endDate: new Date(2023, 6, 1, 15, 30, 0, 0)
    }
  });

  console.log({ eventNonDefaultFilled });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
