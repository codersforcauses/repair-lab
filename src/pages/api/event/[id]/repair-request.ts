import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  get: getRepairRequests
});

async function getRepairRequests(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const event = await prisma.event.findUnique({
    where: { id: id as string }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const repairRequests = await prisma.repairRequest.findMany({
    where: { event: { id: id as string } }
  });

  return res.status(200).json(repairRequests);
}
