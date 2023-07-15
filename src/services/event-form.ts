/* eslint-disable no-unused-vars */

import { Event } from "@prisma/client";

import prisma from "@/lib/prisma";

interface EventCreateInput {
  name: string;
  location: string;
  startDate: Date; // or string?
  endDate: Date; // or string?
  eventType: string;
  volunteers: string[];
}

interface IEventService {
  insert(details: EventCreateInput): Promise<Event>;
}

class EventFormService implements IEventService {
  async insert(details: EventCreateInput): Promise<Event> {
    const createdEvent = await prisma.event.create({
      data: details,
    });

    return createdEvent;
  }
}

export default EventFormService;
