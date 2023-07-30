import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  repairRequestPatchSchema,
  repairRequestPostSchema
} from "@/schema/repair-request";
import RepairRequestService from "@/services/repair-request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(405).json("Not yet implemented!");
      break;
    case "POST":
      await createRepairRequest(req, res);
      break;
    case "PATCH":
      await updateRepairRequest(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const createRepairRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
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
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.issues });
    }

    return res.status(500).json("Error inserting into database!");
  }
};

const updateRepairRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const parseResult = repairRequestPatchSchema.safeParse(req.body);
  if (!parseResult.success) return res.status(400).json(parseResult.error);

  try {
    const {
      id,
      itemMaterial,
      hoursWorked,
      isRepaired,
      isSparePartsNeeded,
      spareParts,
      repairComment
    } = parseResult.data;
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
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.statusMessage = "Repair attempt not found";
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
