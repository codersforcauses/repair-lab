import { NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import apiHandler from "@/lib/api-handler";
import apiPermission from "@/lib/api-permission";
import { PaginationResponse } from "@/lib/pagination";
import { NextApiRequestWithUser } from "@/middleware";
import { createEventSchema, getEventSchema } from "@/schema/event";
import eventService from "@/services/event";
import { ErrorResponse, EventResponse, UserRole } from "@/types";

import prisma from "../../../lib/prisma";

export default apiHandler({
  get: getEvents,
  post: {
    controller: createEvent,
    permission: apiPermission["POST /event"]
  }
});

async function getEvents(
  req: NextApiRequestWithUser,
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

  const isRepairer =
    req.user?.role == UserRole.REPAIRER
      ? {
          eventRepairer: {
            some: {
              userId: req.user?.id as string
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
  req: NextApiRequestWithUser,
  res: NextApiResponse<EventResponse>
) {
  const { eventType, startDate, endDate, ...rest } = createEventSchema.parse(
    req.body
  );

  const newEvent = await prisma.event.create({
    data: {
      ...rest,
      createdBy: req.user?.id as string,
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
