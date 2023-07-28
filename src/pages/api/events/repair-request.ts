import type { NextApiRequest, NextApiResponse } from "next";
import { RepairRequest } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RepairRequest[]>
) {
  if (req.method == "GET") {
    const eventId = req.query.event as string;
    const repairRequests = await prisma.repairRequest.findMany({
      where: { event: { id: eventId } }
    });
    return res.status(200).json(repairRequests);
  }
}
