import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { RepairStatus } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { updateRepairRequestSchema } from "@/schema/repair-request";

export default apiHandler({
  patch: updateRepairRequest,
  get: getRepairRequest
});

async function updateRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const repairRequestId = z.string().parse(req.query.id);
  const parsedData = updateRepairRequestSchema.parse(req.body);

  const {
    itemMaterial,
    hoursWorked,
    isRepaired,
    isSparePartsNeeded,
    spareParts,
    repairComment,
    assignedTo,
    repairStatus
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

  // if repairStatus has a value, use it; otherwise, use isRepaired
  const status = repairStatus
    ? repairStatus
    : // if isRepaired is true, set status to REPAIRED; if isRepaired is false, set status to FAILED
      isRepaired === "true"
      ? RepairStatus.REPAIRED
      : isRepaired === "false"
        ? RepairStatus.FAILED
        : // if isRepaired is undefined, set status to undefined
          undefined;

  await prisma.repairRequest.update({
    where: { id: repairRequestId },
    data: {
      itemMaterial: itemMaterial,
      hoursWorked: hoursWorked,
      status: status,
      spareParts:
        isSparePartsNeeded === "true"
          ? spareParts
          : isRepaired === "false"
            ? ""
            : undefined,
      repairComment: repairComment,
      assignedTo: assignedTo
    }
  });

  return res.status(204).end();
}

async function getRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const repairRequestId = z.string().parse(req.query.id);

  const repairRequest = await prisma.repairRequest.findUnique({
    where: { id: repairRequestId }
  });

  if (!repairRequest) {
    throw new ApiError(
      HttpStatusCode.NotFound,
      "Repair Request does not exist"
    );
  }

  return res.status(200).json(repairRequest);
}
