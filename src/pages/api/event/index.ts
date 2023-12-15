import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import { createEventSchema } from "@/schema/event";
import eventService from "@/services/event";
import { EventResponse, EventStatus } from "@/types";

import prisma from "../../../lib/prisma";

export default apiHandler({
  get: getEvents,
  post: createEvent
});

function paramToArray(param: string | string[] | undefined) {
  let array: string[] | undefined;
  if (param === undefined) {
    array = undefined;
  } else if (typeof param === "string") {
    if (!param) array = []; // empty string
    else array = param.split(",").map((item) => item.trim());
  } else if (Array.isArray(param)) {
    array = param.flatMap((item) => item.split(",").map((item) => item.trim()));
  }
  return array;
}
async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse[]>
) {
  const {
    sortKey,
    sortMethod,
    searchWord,
    startDate,
    endDate,
    eventType,
    eventStatus,
    createdBy
  } = req.query;

  const sortObj: { [key: string]: "asc" | "desc" } = {
    [sortKey as string]: sortMethod as "asc" | "desc"
  };

  const eventTypeList = paramToArray(eventType);
  const userIDList = paramToArray(createdBy);
  const eventStatusList = paramToArray(eventStatus) as EventStatus[];

  const events = await prisma.event.findMany({
    where: {
      ...(searchWord && {
        OR: [
          { name: { contains: searchWord as string, mode: "insensitive" } },
          {
            createdBy: { contains: searchWord as string, mode: "insensitive" }
          },
          { location: { contains: searchWord as string, mode: "insensitive" } },
          { eventType: { contains: searchWord as string, mode: "insensitive" } }
          // Add more fields to search if necessary
        ]
      }),
      ...(startDate && {
        startDate: { gte: new Date(startDate as string) }
      }),
      ...(endDate && {
        startDate: { lte: new Date(endDate as string) }
      }),
      ...(eventTypeList && {
        eventType: { in: eventTypeList }
      }),
      ...(eventStatusList && {
        status: { in: eventStatusList }
      }),
      // positive search - do not allow length 0
      ...(userIDList &&
        userIDList.length != 0 && {
          createdBy: { in: userIDList }
        })
    },
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
