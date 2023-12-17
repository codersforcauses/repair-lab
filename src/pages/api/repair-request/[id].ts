import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { updateRepairRequestSchema } from "@/schema/repair-request";

export default apiHandler({
  patch: updateRepairRequest
});

async function updateRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
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
    where: { id: id as string }
  });

  if (!existingRepairRequest) {
    throw new ApiError(
      HttpStatusCode.NotFound,
      "Repair Request does not exist"
    );
  }

  await prisma.repairRequest.update({
    where: { id: id as string },
    data: {
      itemMaterial: itemMaterial,
      hoursWorked: hoursWorked,
      status: isRepaired === "true" ? "REPAIRED" : "FAILED",
      spareParts: isSparePartsNeeded === "true" ? spareParts : "",
      repairComment: repairComment
    }
  });

  return res.status(204).json(null);
}
