import { ApiError } from "next/dist/server/api-utils";
import { RepairRequest } from "@prisma/client";
import { Status } from "@prisma/client";

import prisma from "@/lib/prisma";

interface RepairRequestCreateInput {
  createdBy: string;
  description: string;
  itemBrand: string;
  itemType: string;
  eventId: string;
  images?: string[];
  comment?: string;
  thumbnailImage: string;
}

interface RepairRequestUpdateInput {
  id: string;
  itemMaterial: string;
  hoursWorked: number;
  status: Status;
  spareParts?: string | undefined;
  repairComment: string;
}

interface IRepairRequestService {
  insert(details: RepairRequestCreateInput): Promise<RepairRequest>;
  update(details: RepairRequestUpdateInput): Promise<RepairRequest>;
  fetchAllByVolunteer(assignedTo: string): Promise<RepairRequest[]>;
}

class RepairRequestService implements IRepairRequestService {
  fetchAllByVolunteer(assignedTo: string): Promise<RepairRequest[]> {
    throw new Error("Method not implemented.");
  }
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

    const existingRepairRequest = await prisma.repairRequest.findUnique({
      where: { id: id }
    });

    if (!existingRepairRequest) {
      throw new ApiError(404, "Repair Request does not exist");
    }

    const repairRequest = await prisma.repairRequest.update({
      where: { id },
      data: rest
    });

    return repairRequest;
  }

  async fetchAllByEvent(eventId: string): Promise<RepairRequest[]> {
    const repairRequests = await prisma.repairRequest.findMany({
      where: {
        eventId,
        status: {
          // Display only ACCEPTED requests
          in: ["ACCEPTED", "PENDING"]
        }
      },
      include: {
        images: true
      }
    });
    return repairRequests;
  }
}

export default RepairRequestService;
