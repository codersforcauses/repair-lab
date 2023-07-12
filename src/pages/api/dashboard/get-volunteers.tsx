import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  if (req.method == "GET") {
    const eventName = req.query.event as string;
    const event = await prisma.event.findUnique({
      where: { name: eventName }
    });
    if (!event) {
      return res.status(404).json([]);
    }
    const volunteers: string[] = event.volunteers;
    return res.status(200).json(volunteers);
  }
}
