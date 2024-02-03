import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import apiHandler from "@/lib/api-handler";
import { createEventSchema, getEventSchema } from "@/schema/event";
import eventService from "@/services/event";
import userService from "@/services/user";
import { ErrorResponse, EventResponse, UserRole } from "@/types";

import prisma from "../../../lib/prisma";

export default apiHandler({
  get: getEvents,
  post: createEvent
});

async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse[] | ErrorResponse>
) {
  const {
    sortKey = "startDate",
    sortMethod = "asc",
    searchWord = "",
    minDate,
    maxDate,
    eventType,
    eventStatus,
    createdBy
  } = getEventSchema.parse(req.query);

  const sortObj: Record<string, "asc" | "desc"> = {
    [sortKey]: sortMethod
  };

  const { userId } = getAuth(req);

  const userRole = await userService.getRole(userId!);

  let events;

  if (userRole === UserRole.REPAIRER) {
    events = await prisma.event.findMany({
      where: {
        eventRepairers: {
          some: {
            userId: userId!
          }
        },
        OR: [
          { name: { contains: searchWord, mode: "insensitive" } },
          { createdBy: { contains: searchWord, mode: "insensitive" } },
          { location: { contains: searchWord, mode: "insensitive" } },
          { eventType: { contains: searchWord, mode: "insensitive" } }
        ],
        startDate: {
          gte: minDate ? new Date(minDate) : undefined,
          lte: maxDate ? new Date(maxDate) : undefined
        },
        eventType: { in: eventType },
        status: { in: eventStatus },
        createdBy: { in: createdBy }
      },
      orderBy: sortObj
    });
  } else {
    events = await prisma.event.findMany({
      where: {
        OR: [
          { name: { contains: searchWord, mode: "insensitive" } },
          { createdBy: { contains: searchWord, mode: "insensitive" } },
          { location: { contains: searchWord, mode: "insensitive" } },
          { eventType: { contains: searchWord, mode: "insensitive" } }
        ],
        startDate: {
          gte: minDate ? new Date(minDate) : undefined,
          lte: maxDate ? new Date(maxDate) : undefined
        },
        eventType: { in: eventType },
        status: { in: eventStatus },
        createdBy: { in: createdBy }
      },
      orderBy: sortObj
    });
  }

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
