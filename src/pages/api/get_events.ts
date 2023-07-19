import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@prisma/client";

import prisma from "../../lib/prisma";

export default async function get_events(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  const { sortKey, sortMethod } = req.query; // Use req.query instead of req.body to access query parameters
  const sortObj: { [key: string]: "asc" | "desc" } = {};
  sortObj[sortKey as string] = sortMethod as "asc" | "desc";

  const events = await prisma.event.findMany({
    orderBy: sortObj
  });
  res.status(200).json(events);
}

export const config = {};
