import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@prisma/client";

import prisma from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event | object>
) {
  if (req.method == "GET") {
    const id = req.query.event as string;
    const event = await prisma.event.findUnique({
      where: { id: id }
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json(event);
  }
}
