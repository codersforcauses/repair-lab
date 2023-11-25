import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { clerkClient, getAuth, User } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import { createEventSchema } from "@/schema/event";

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
    {} as Record<string, User>
  );

  for (const event of events) {
    const user = userMap[event.createdBy];
    if (user) event.createdBy = `${user.firstName} ${user.lastName}`;
  }

  res.status(200).json(events);
}

async function createEvent(req: NextApiRequest, res: NextApiResponse) {
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

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
