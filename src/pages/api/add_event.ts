import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, createdBy, location, startDate, eventType, status } =
      req.body;
    const description = "description abc";
    const endDate = "2003-08-04T18:24:00.000Z";

    try {
      const newEvent = await prisma.event.create({
        data: {
          name,
          createdBy,
          location,
          startDate,
          event: {
            connect: {
              name: eventType
            }
          },
          status,
          description,
          endDate
        }
      });

      res.status(200).json(newEvent);
    } catch (error) {
      console.error("An error occurred while adding the event:", error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the event." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
