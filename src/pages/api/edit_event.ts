import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Event } from "@prisma/client";

// still need to add what to do if the value inputed is not a valid input for the data, still ned to figure out date 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, name, createdBy, location, startDate, eventType, status } = req.body;
    console.log("in hereeeeeeeeee");

    try {
      // Check if the event already exists in the database
      const existingEvent = await prisma.event.findUnique({
        where: { id },
      });

      if (existingEvent) {
        // Event exists, update the row
        const updatedEvent = await prisma.event.update({
          where: { id },
          data: {
            name,
            createdBy,
            location,
            startDate,
            eventType,
            status,
          },
        });

        res.status(200).json(updatedEvent);
      } 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while updating the event." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
