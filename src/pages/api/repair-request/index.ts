import type { NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { NextApiRequestWithUser } from "@/middleware";
import { createRepairRequestSchema } from "@/schema/repair-request";

export default apiHandler({
  post: createRepairRequest
});

async function createRepairRequest(
  req: NextApiRequestWithUser,
  res: NextApiResponse<{ id: string }>
) {
  const parsedData = createRepairRequestSchema.parse(req.body);

  const { images, ...rest } = parsedData;
  const record = await prisma.repairRequest.create({
    data: {
      ...rest,
      createdBy: req.user?.id as string,
      images: {
        create: images?.map((image) => {
          return {
            s3Key: image
          };
        })
      }
    }
  });

  return res.status(200).json({ id: record.id });
}
