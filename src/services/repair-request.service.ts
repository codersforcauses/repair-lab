import prisma from "@/lib/prisma";
import { RepairRequest } from "@/types";

const insert = async (insertDetails: RepairRequest & { createdBy: string }) => {
  const { images, ...rest } = insertDetails;
  const repairRequest = await prisma.repairRequest.create({
    data: {
      ...rest,
      images: {
        create: images?.map((image) => {
          return {
            s3Key: image
          };
        })
      }
    }
  });
  return repairRequest;
};

const repairRequestService = {
  insert
};

export default repairRequestService;
