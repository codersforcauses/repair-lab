import prisma from "./setup";

export const cleanup = async () => {
  await prisma.message.deleteMany();
};

export const teardown = async () => {
  await cleanup();
  await prisma.$disconnect();
};
