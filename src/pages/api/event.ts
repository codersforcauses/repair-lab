import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getEvents(req, res);
      break;
    case "POST":
      await createEvent(req, res);
      break;
    case "PATCH":
      await updateEvent(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sortKey, sortMethod, searchWord } = req.query;
  const sortObj: { [key: string]: "asc" | "desc" } = {};
  sortObj[sortKey as string] = sortMethod as "asc" | "desc";

  // Use 'search' query parameter to filter events
  const events = await prisma.event.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchWord as string,
            mode: "insensitive"
          }
        },
        {
          location: {
            contains: searchWord as string,
            mode: "insensitive"
          }
        }
        // Add more fields to search if necessary
      ]
    },
    orderBy: sortObj
  });

  res.status(200).json(events);
};

const createEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, createdBy, location, startDate, eventType, status } = req.body;
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
};

const updateEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, createdBy, location, startDate, eventType, status } =
    req.body;

  try {
    // Check if the event already exists in the database
    const existingEvent = await prisma.event.findUnique({
      where: { id }
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
          status
        }
      });

      res.status(200).json(updatedEvent);
    }
  } catch (error) {
    console.error("An error occurred while updating the event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the event." });
  }
};
