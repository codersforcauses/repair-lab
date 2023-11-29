import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient, getAuth, User } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import { createEventSchema } from "@/schema/event";
import { Event, EventResponse } from "@/types";

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
    orderBy: sortObj
  });

  const userId = events.map((e) => e.createdBy);
  const users = await clerkClient.users.getUserList({ userId });
  const userMap = users.reduce(
    (obj, item) => {
      obj[item.id] = item;
      return obj;
    },
    {} as Partial<Record<string, User>>
  );

  const eventResponse: EventResponse[] = events.map((e) => {
    return {
      ...e,
      firstName: userMap[e.createdBy]?.firstName ?? e.createdBy,
      lastName: userMap[e.createdBy]?.lastName ?? ""
    };
  });

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
