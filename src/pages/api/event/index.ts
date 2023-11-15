import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { getAuth } from "@clerk/nextjs/server";

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
  const { eventType, startDate, endDate, ...rest } = createEventSchema.parse(
    req.body
  );

  const { userId } = getAuth(req);

  const newEvent = await prisma.event.create({
    data: {
      ...rest,
      createdBy: userId as string,
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
