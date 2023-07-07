import prisma from "@/lib/prisma";

const getAll = async () => {
  return await prisma.itemType.findMany();
};
const itemTypeService = {
  getAll
};

export default itemTypeService;
