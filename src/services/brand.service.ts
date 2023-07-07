import prisma from "@/lib/prisma";

const getAll = async () => {
  return await prisma.brand.findMany();
};
const brandService = {
  getAll
};

export default brandService;
