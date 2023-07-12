import type { NextApiRequest, NextApiResponse } from "next";
import { RepairRequestImage } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<RepairRequestImage[]>
) {
  if (req.method == "GET") {
    const repairRequestId = req.query.repairRequestId as string;
    const repairRequestImages = await prisma.repairRequestImage.findMany({
      where: { repairRequest: { id: repairRequestId } }
    });
    return res.status(200).json(repairRequestImages);
  }
}
