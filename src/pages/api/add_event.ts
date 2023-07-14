import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Event } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, createdBy, location, startDate, eventType, status } = req.body;
      const description = "description abc";
      const endDate = "2023-12-31T23:59:59.999Z";

      const newEvent = await prisma.event.create({
        data: {
          name,
          createdBy,
          location,
          startDate,
          eventType,
          status,
          description,
          endDate,
          event: {
            
          },
        },
      });

      res.status(201).json(newEvent);
    } catch (error) {
      console.error("An error occurred while adding the event:", error);
      res.status(500).json({ error: "Failed to add the event." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
