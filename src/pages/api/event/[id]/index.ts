import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import apiPermission from "@/lib/api-permission";
import prisma from "@/lib/prisma";
import { updateEventSchema } from "@/schema/event";
import eventService from "@/services/event";
import { EventResponse } from "@/types";

export default apiHandler({
  get: {
    controller: getEvent,
    permission: apiPermission["GET /event/[^/]*"]
  },
  patch: updateEvent
});

async function getEvent(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  const eventId = z.string().parse(req.query.id);

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      eventRepairer: true
    }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  // TODO: make a singular version
  const eventResponse = (await eventService.toClientResponse([event]))[0];
  return res.status(200).json(eventResponse);
}

async function updateEvent(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  const {
    name,
    location,
    eventType,
    status,
    description,
    disclaimer,
    startDate,
    endDate,
    images
  } = updateEventSchema.parse(req.body);

  const { id } = req.query;

  // Check if the event already exists in the database
  const existingEvent = await prisma.event.findUnique({
    where: { id: id as string }
  });

  if (!existingEvent) {
    throw new ApiError(HttpStatusCode.NotFound, "Event does not exist");
  }

  // Event exists, update the row
  const updatedEvent = await prisma.event.update({
    where: { id: id as string },
    data: {
      name: name ?? existingEvent.name,
      location: location ?? existingEvent.location,
      eventType: eventType ?? existingEvent.eventType,
      startDate: startDate ? new Date(startDate) : existingEvent.startDate,
      endDate: endDate ? new Date(endDate) : existingEvent.endDate,
      description: description ?? existingEvent.description,
      disclaimer: disclaimer ?? existingEvent.disclaimer,
      status: status ?? existingEvent.status,
      images:
        images && images.length > 0
          ? {
              createMany: {
                data: images?.map((image) => ({
                  s3Key: image
                }))
              }
            }
          : undefined
    },
    include: {
      images: true
    }
  });

  const eventResponse = (
    await eventService.toClientResponse([updatedEvent])
  )[0];

  res.status(200).json(eventResponse);
}
