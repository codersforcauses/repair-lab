import prisma from "@/lib/prisma";

const getAll = async () => {
  return await prisma.brand.findMany();
};
const brandModel = {
  getAll
};

export default brandModel;
