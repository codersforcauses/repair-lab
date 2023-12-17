import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { updateRepairRequestSchema } from "@/schema/repair-request";
import repairRequestService from "@/services/repairRequest";
import { RepairRequestResponse } from "@/types";

export default apiHandler({
  patch: updateRepairRequest
});

async function updateRepairRequest(
  req: NextApiRequest,
  res: NextApiResponse<RepairRequestResponse>
) {
  const repairRequestId = req.query.id as string;
  const parsedData = updateRepairRequestSchema.parse(req.body);

  const {
    itemMaterial,
    hoursWorked,
    isRepaired,
    isSparePartsNeeded,
    spareParts,
    repairComment
  } = parsedData;

  const existingRepairRequest = await prisma.repairRequest.findUnique({
    where: { id: repairRequestId }
  });

  if (!existingRepairRequest) {
    throw new ApiError(
      HttpStatusCode.NotFound,
      "Repair Request does not exist"
    );
  }

  const repairAttempt = await prisma.repairRequest.update({
    where: { id: repairRequestId },
    data: {
      itemMaterial: itemMaterial,
      hoursWorked: hoursWorked,
      status: isRepaired === "true" ? "REPAIRED" : "FAILED",
      spareParts: isSparePartsNeeded === "true" ? spareParts : "",
      repairComment: repairComment
    }
  });

  const repairRequestResponse = (
    await repairRequestService.toClientResponse([repairAttempt])
  )[0];

  return res.status(200).json(repairRequestResponse);
}
