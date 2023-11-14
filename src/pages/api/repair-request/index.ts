import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { getAuth } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { createRepairRequestSchema } from "@/schema/repair-request";

export default apiHandler({
  post: createRepairRequest
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

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
