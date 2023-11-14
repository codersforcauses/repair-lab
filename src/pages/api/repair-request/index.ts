import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { getAuth } from "@clerk/nextjs/server";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import {
  createRepairRequestSchema,
  updateRepairRequestSchema
} from "@/schema/repair-request";

export default apiHandler({
  post: createRepairRequest,
  patch: updateRepairRequest
});

async function createRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const parsedData = createRepairRequestSchema.parse(req.body);

  const { userId } = getAuth(req);

  const { images, ...rest } = parsedData;
  const repairRequest = await prisma.repairRequest.create({
    data: {
      ...rest,
      thumbnailImage: "Fake S3 Key", // TODO: change this once image upload works.
      createdBy: userId as string,
      images: {
        create: images?.map((image) => {
          return {
            s3Key: image
          };
        })
      }
    }
  });

  return res.status(200).json(repairRequest);
}

async function updateRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const parsedData = updateRepairRequestSchema.parse(req.body);

  const {
    id,
    itemMaterial,
    hoursWorked,
    isRepaired,
    isSparePartsNeeded,
    spareParts,
    repairComment
  } = parsedData;

  const existingRepairRequest = await prisma.repairRequest.findUnique({
    where: { id: id }
  });

  if (!existingRepairRequest) {
    throw new ApiError(
      HttpStatusCode.NotFound,
      "Repair Request does not exist"
    );
  }

  const repairAttempt = await prisma.repairRequest.update({
    where: { id },
    data: {
      itemMaterial: itemMaterial,
      hoursWorked: hoursWorked,
      status: isRepaired === "true" ? "REPAIRED" : "FAILED",
      spareParts: isSparePartsNeeded === "true" ? spareParts : "",
      repairComment: repairComment
    }
  });

  return res.status(200).json(repairAttempt);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
