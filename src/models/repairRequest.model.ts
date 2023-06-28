import prisma from "@/lib/prisma";

const insert = async (
  eventId: string,
  description: string,
  itemType: string,
  itemBrand: string,
  createdBy: string
) => {
  const repairRequest = await prisma.repairRequest.create({
    data: {
      createdBy,
      eventId,
      description,
      itemType,
      itemBrand
    }
  });
  return repairRequest;
};

const repairRequestModel = {
  insert
};

export default repairRequestModel;
