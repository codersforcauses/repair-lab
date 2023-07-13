import type { NextApiRequest, NextApiResponse } from "next";
import { RepairRequest } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RepairRequest[]>
) {
  if (req.method == "GET") {
    const eventName = req.query.event as string; // TODO: Later use event id from dynamic route
    const repairRequests = await prisma.repairRequest.findMany({
      where: { event: { id: eventName } }
    });
    return res.status(200).json(repairRequests);
  }
}
