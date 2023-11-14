import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  get: getEvent,
  patch: updateEvent
});

async function getEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const event = await prisma.event.findUnique({
    where: { id: id as string }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  return res.status(200).json(event);
}

async function updateEvent(req: NextApiRequest, res: NextApiResponse) {
  const { name, createdBy, location, startDate, eventType, status } = req.body;

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
      name,
      createdBy,
      location,
      startDate,
      eventType,
      status
    }
  });

  res.status(200).json(updatedEvent);
}
