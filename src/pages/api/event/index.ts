import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

import apiHandler from "@/lib/api-handler";
import { PaginationResponse } from "@/lib/pagination";
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
  res: NextApiResponse<PaginationResponse<EventResponse[]> | ErrorResponse>
) {
  const {
    sortKey = "startDate",
    sortMethod = "asc",
    searchWord = "",
    minDate,
    maxDate,
    eventType,
    eventStatus,
    createdBy,
    page,
    perPage
  } = getEventSchema.parse(req.query);

  const sortObj: Record<string, "asc" | "desc"> = {
    [sortKey]: sortMethod
  };
  const { userId } = getAuth(req);
  const role = await userService.getRole(userId as string);
  const isRepairer =
    role == UserRole.REPAIRER
      ? {
          eventRepairer: {
            some: {
              userId: userId as string
            }
          }
        }
      : {};
  const where: Prisma.EventWhereInput = {
    ...isRepairer,
    OR: [
      { name: { contains: searchWord, mode: "insensitive" } },
      { createdBy: { contains: searchWord, mode: "insensitive" } },
      { location: { contains: searchWord, mode: "insensitive" } },
      { eventType: { contains: searchWord, mode: "insensitive" } }
    ],
    startDate: {
      gte: minDate,
      lte: maxDate
    },
    eventType: { in: eventType },
    status: { in: eventStatus },
    createdBy: { in: createdBy }
  };

  const [events, totalCount] = await prisma.$transaction([
    prisma.event.findMany({
      where,
      orderBy: sortObj,
      skip: (page - 1) * perPage,
      take: perPage
    }),
    prisma.event.count({ where })
  ]);

  const eventResponse: EventResponse[] =
    await eventService.toClientResponse(events);

  res.status(200).json({
    items: eventResponse,
    meta: {
      page,
      perPage,
      totalCount,
      lastPage: Math.ceil(totalCount / perPage)
    }
  });
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
