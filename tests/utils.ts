import prisma from "./setup";

export const cleanup = async () => {
  await prisma.repairRequestImage.deleteMany();
};

export const teardown = async () => {
  await cleanup()
  .then(() => prisma.$disconnect());
};
