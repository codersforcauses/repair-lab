import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { createRepairRequestSchema } from "@/schema/repair-request";
import repairRequestService from "@/services/repairRequest";
import { RepairRequestResponse } from "@/types";

export default apiHandler({
  post: createRepairRequest
});

async function createRepairRequest(
  req: NextApiRequest,
  res: NextApiResponse<RepairRequestResponse>
) {
  const parsedData = createRepairRequestSchema.parse(req.body);

  const { userId } = getAuth(req);

  const { images, ...rest } = parsedData;
  const repairRequest = await prisma.repairRequest.create({
    data: {
      ...rest,
      createdBy: userId!,
      images: {
        create: images?.map((image) => {
          return {
            s3Key: image
          };
        })
      }
    }
  });

  const repairRequestResponse = (
    await repairRequestService.toClientResponse([repairRequest])
  )[0];

  return res.status(200).json(repairRequestResponse);
}
