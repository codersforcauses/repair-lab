import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { updateEventSchema } from "@/schema/event";
import { Event } from "@/types";

export default apiHandler({
  get: getEvent,
  patch: updateEvent
});

async function getEvent(req: NextApiRequest, res: NextApiResponse<Event>) {
  const { id } = req.query;

  const event = await prisma.event.findUnique({
    where: { id: id as string }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  return res.status(200).json(event);
}

async function updateEvent(req: NextApiRequest, res: NextApiResponse<Event>) {
  const {
    name,
    location,
    eventType,
    status,
    description,
    disclaimer,
    startDate,
    endDate
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
      status: status ?? existingEvent.status
    }
  });

  res.status(200).json(updatedEvent);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
