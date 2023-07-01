// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@prisma/client";

import prisma from "../../lib/prisma";

// getMessagesByContent retrieves all e from the database
// that have the content specified in the query string.
export default async function get_events(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  const events = await prisma.event.findMany({
    where: { name: req.query.content as string }
  });

  res.status(200).json(events);
}

export const config = {};
