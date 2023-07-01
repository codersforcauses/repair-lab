import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  const event = await prisma.event.findMany();
  return res.status(201).json(event);
}
