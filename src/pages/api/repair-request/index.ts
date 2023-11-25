import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { getAuth } from "@clerk/nextjs/server";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { createRepairRequestSchema } from "@/schema/repair-request";
import userService from "@/services/user";
import { UserRole } from "@/types";

export default apiHandler({
  get: getRepairRequests,
  post: createRepairRequest
});

async function getRepairRequests(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId)
    throw new ApiError(HttpStatusCode.BadRequest, "User not signed in");
  const role = await userService.getRole(userId);

  const response = await prisma.repairRequest.findMany(
    role === UserRole.ADMIN
      ? undefined
      : {
          where: {
            OR: [{ createdBy: userId }, { assignedTo: userId }]
          }
        }
  );

  return res.status(200).json(response);
}

async function createRepairRequest(req: NextApiRequest, res: NextApiResponse) {
  const parsedData = createRepairRequestSchema.parse(req.body);

  const { userId } = getAuth(req);

  const { images, ...rest } = parsedData;
  const repairRequest = await prisma.repairRequest.create({
    data: {
      ...rest,
      thumbnailImage: "Fake S3 Key", // TODO: change this once image upload works.
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

  return res.status(200).json(repairRequest);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
