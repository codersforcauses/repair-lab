import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";

import prisma from "../../../lib/prisma";

export default apiHandler({
  get: getEvents,
  post: createEvent,
  patch: updateEvent
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

async function updateEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, createdBy, location, startDate, eventType, status } =
    req.body;

  // Check if the event already exists in the database
  const existingEvent = await prisma.event.findUnique({
    where: { id }
  });

  if (!existingEvent) {
    throw new ApiError(HttpStatusCode.BadRequest, "Event does not exist");
  }

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
