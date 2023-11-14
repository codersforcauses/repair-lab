import { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";

import prisma from "../../../lib/prisma";

export default apiHandler({
  get: getEvents,
  post: createEvent
});

async function getEvents(req: NextApiRequest, res: NextApiResponse) {
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
          createdBy: {
            contains: searchWord as string,
            mode: "insensitive"
          }
        },
        {
          location: {
            contains: searchWord as string,
            mode: "insensitive"
          }
        },
        {
          eventType: {
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
}

async function createEvent(req: NextApiRequest, res: NextApiResponse) {
  const { name, createdBy, location, startDate, eventType, status } = req.body;

  // TODO: Replace this hardcoded value.
  const description = "description abc";
  const endDate = "2003-08-04T18:24:00.000Z";

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
}
