import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

import apiHandler from "@/lib/api-handler";
import {
  repairRequestPatchSchema,
  repairRequestPostSchema
} from "@/schema/repair-request";
import RepairRequestService from "@/services/repair-request";

export default apiHandler({
  post: createRepairRequest,
  patch: updateRepairRequest
});

async function createRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const parsedData = repairRequestPostSchema.parse(req.body);

  const { userId } = getAuth(req);

  const repairRequestService = new RepairRequestService();
  const repairRequest = await repairRequestService.insert({
    ...parsedData,
    thumbnailImage: "Fake S3 Key", // TODO: Change this once image upload works.
    createdBy: userId as string
  });

  return res.status(200).json({
    id: repairRequest.id
  });
}

async function updateRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const parsedData = repairRequestPatchSchema.parse(req.body);

  const {
    id,
    itemMaterial,
    hoursWorked,
    isRepaired,
    isSparePartsNeeded,
    spareParts,
    repairComment
  } = parsedData;

  const repairRequestService = new RepairRequestService();
  const repairAttempt = await repairRequestService.update({
    id: id,
    itemMaterial: itemMaterial,
    hoursWorked: hoursWorked,
    status: isRepaired === "true" ? "REPAIRED" : "FAILED",
    spareParts: isSparePartsNeeded === "true" ? spareParts : "",
    repairComment: repairComment
  });

  return res.status(200).json(repairAttempt);
}

const getAllRepairRequestsByEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const repairRequestService = new RepairRequestService();
    const repairRequests = await repairRequestService.fetchAllByEvent(
      req.query.event as string
    );
    return res.status(200).json(repairRequests);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.statusMessage = "Event ID not found";
        return res.status(404).end();
      }
      return res.status(400).json({ message: "Client Error" });
    }
    return res.status(500).json({ message: { error } });
  }
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
