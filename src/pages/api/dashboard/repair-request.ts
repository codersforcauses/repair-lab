import type { NextApiRequest, NextApiResponse } from "next";
import { RepairRequest } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<RepairRequest[]>
) {
  const repairRequest = await prisma.repairRequest.findMany();
  return res.status(201).json(repairRequest);
}
