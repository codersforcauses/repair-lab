/* eslint-disable no-unused-vars */

import { RepairRequest } from "@prisma/client";

import prisma from "@/lib/prisma";

interface RepairRequestCreateInput {
  createdBy: string;
  description: string;
  itemBrand: string;
  itemType: string;
  eventId: string;
  images?: string[];
  comment: string;
  thumbnailImage: string;
}

interface IRepairRequestService {
  insert(details: RepairRequestCreateInput): Promise<RepairRequest>;
}

class RepairRequestService implements IRepairRequestService {
  async insert(details: RepairRequestCreateInput): Promise<RepairRequest> {
    const { images, ...rest } = details;
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
  }
}

export default RepairRequestService;
