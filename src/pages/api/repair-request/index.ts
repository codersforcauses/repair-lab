import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { createRepairRequestSchema } from "@/schema/repair-request";
import sendEmail from "@/services/sendEmail";

export default apiHandler({
  post: createRepairRequest
});

async function createRepairRequest(
  req: NextApiRequest,
  res: NextApiResponse<{ id: string }>
) {
  const parsedData = createRepairRequestSchema.parse(req.body);

  const { userId } = getAuth(req);

  const { images, ...rest } = parsedData;

  const record = await prisma.repairRequest.create({
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

  const requestId = record.id;

  // send confirmation email to customer
  const emailSubject = "Repair Request Confimation";
  sendEmail(emailSubject, userId!, requestId); // TODO: Do not handle sending result for now

  return res.status(200).json({ id: requestId });
}
