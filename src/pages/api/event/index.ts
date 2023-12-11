import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import { createEventSchema } from "@/schema/event";
import eventService from "@/services/event";
import { Event, EventResponse, EventWithRepairers } from "@/types";

import prisma from "../../../lib/prisma";

export default apiHandler({
  get: getEvents,
  post: createEvent
});

async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse[]>
) {
  const { sortKey, sortMethod, searchWord } = req.query;
  const sortObj: { [key: string]: "asc" | "desc" } = {};
  sortObj[sortKey as string] = sortMethod as "asc" | "desc";

  // Use 'search' query parameter to filter events
  const events: EventWithRepairers[] = await prisma.event.findMany({
    ...(searchWord
      ? {
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
          }
        }
      : {}),
    orderBy: sortObj,
    include: {
      eventRepairer: true
    }
  });

  const eventResponse: EventResponse[] =
    await eventService.toClientResponse(events);

  res.status(200).json(eventResponse);
}

async function createEvent(req: NextApiRequest, res: NextApiResponse<Event>) {
  const { eventType, startDate, endDate, ...rest } = createEventSchema.parse(
    req.body
  );

  const { userId } = getAuth(req);

  const newEvent = await prisma.event.create({
    data: {
      ...rest,
      createdBy: userId!,
      event: {
        connect: {
          name: eventType
        }
      },
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }
  });

  res.status(200).json(newEvent);
}
