/* eslint-disable no-unused-vars */

import { RepairRequest } from "@prisma/client";
import { ItemStatus } from "@prisma/client";

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

interface RepairRequestUpdateInput {
  id: string;
  itemMaterial: string;
  hoursWorked: number;
  itemStatus: ItemStatus;
  spareParts?: string | undefined;
  repairComment: string;
}

interface IRepairRequestService {
  insert(details: RepairRequestCreateInput): Promise<RepairRequest>;
  update(details: RepairRequestUpdateInput): Promise<RepairRequest>;
  fetchAllByVolunteer(assignedTo: string): Promise<RepairRequest[]>;
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

  async update(details: RepairRequestUpdateInput): Promise<RepairRequest> {
    const { id, ...rest } = details;
    const repairRequest = await prisma.repairRequest.update({
      where: { id },
      data: rest
    });

    return repairRequest;
  }

  async fetchAllByVolunteer(assignedTo: string): Promise<RepairRequest[]> {
    const repairRequests = await prisma.repairRequest.findMany({
      where: {
        assignedTo
      }
    });

    return repairRequests;
  }

}

export default RepairRequestService;
