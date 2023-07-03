import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  const events = await prisma.event.findMany();
  return res.status(201).json(events);
}
