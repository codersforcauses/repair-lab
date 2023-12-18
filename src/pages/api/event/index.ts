import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { EventStatus } from "@prisma/client";

import apiHandler from "@/lib/api-handler";
import { createEventSchema } from "@/schema/event";
import eventService from "@/services/event";
import { ErrorResponse, EventResponse } from "@/types";

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
function takeFirst(param: string | string[] | undefined) {
  if (Array.isArray(param)) return param[0];
  return param;
}

async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse[] | ErrorResponse>
) {
  const {
    sortKey, // required
    sortMethod, // required
    searchWord,
    startDate,
    endDate,
    eventType,
    eventStatus,
    createdBy
  } = req.query;

  const safeSortMethod = takeFirst(sortMethod);
  const safeSortKey = takeFirst(sortKey);
  const safeSearchWord = takeFirst(searchWord);
  const safeStartDate = takeFirst(startDate);
  const safeEndDate = takeFirst(endDate);

  if (!safeSortKey || !Object.keys(prisma.event.fields).includes(safeSortKey))
    return res.status(400).json({ message: "Incorrect value for sortKey" });
  if (!safeSortMethod || (safeSortMethod != "asc" && safeSortMethod != "desc"))
    return res.status(400).json({ message: "Incorrect value for sortMethod" });

  const sortObj: { [key: string]: "asc" | "desc" } = {
    [safeSortKey]: safeSortMethod
  };

  const eventTypeList = paramToArray(eventType);
  const userIDList = paramToArray(createdBy);
  const eventStatusList = paramToArray(eventStatus);

  const isEventStatus = (value: string): value is EventStatus =>
    value in EventStatus;
  if (eventStatusList && !eventStatusList.every(isEventStatus))
    return res.status(400).json({ message: "Incorrect value for eventStatus" });

  const events = await prisma.event.findMany({
    where: {
      ...(safeSearchWord && {
        OR: [
          { name: { contains: safeSearchWord, mode: "insensitive" } },
          {
            createdBy: { contains: safeSearchWord, mode: "insensitive" }
          },
          { location: { contains: safeSearchWord, mode: "insensitive" } },
          { eventType: { contains: safeSearchWord, mode: "insensitive" } }
          // Add more fields to search if necessary
        ]
      }),
      ...((safeStartDate || safeEndDate) && {
        startDate: {
          ...(safeStartDate && { gte: new Date(safeStartDate) }),
          ...(safeEndDate && { lte: new Date(safeEndDate) })
        }
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
