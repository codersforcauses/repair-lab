// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@prisma/client";

import prisma from "../../lib/prisma";

// Just getting events from prisma db and responding with them
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  const events = await prisma.event.findMany();
  res.status(200).json(events);
}

export const config = {};
