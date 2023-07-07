import prisma from "@/lib/prisma";

const getAll = async () => {
  return await prisma.itemType.findMany();
};
const itemTypeModel = {
  getAll
};

export default itemTypeModel;
