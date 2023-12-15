import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import { createEventSchema } from "@/schema/event";
import eventService from "@/services/event";
import { EventResponse } from "@/types";

import prisma from "../../../lib/prisma";

export default apiHandler({
  get: getEvents,
  post: createEvent
});

async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse[]>
) {
  const { sortKey, sortMethod, searchWord, startDate, endDate } = req.query;
  const sortObj: { [key: string]: "asc" | "desc" } = {};
  sortObj[sortKey as string] = sortMethod as "asc" | "desc";

  // Use 'search' query parameter to filter events
  const events = await prisma.event.findMany({
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
    ...(startDate
      ? {
          where: {
            startDate: {
              gte: new Date(startDate as string)
            }
          }
        }
      : {}),
    ...(endDate
      ? {
          where: {
            startDate: {
              lte: new Date(endDate as string)
            }
          }
        }
      : {}),
    orderBy: sortObj
  });

  const eventResponse: EventResponse[] =
    await eventService.toClientResponse(events);

  res.status(200).json(eventResponse);
}

async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
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
  const eventResponse = (await eventService.toClientResponse([newEvent]))[0];
  res.status(200).json(eventResponse);
}
