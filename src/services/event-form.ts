import { Event } from "@prisma/client";

import prisma from "@/lib/prisma";

interface EventCreateInput {
  eventId: string;
  createdBy: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  eventType: string;
  description: string;
  volunteers: string[];
}

interface IEventService {
  insert(details: EventCreateInput): Promise<Event>;
}

class EventFormService implements IEventService {
  async insert(details: EventCreateInput): Promise<Event> {
    const { volunteers, ...rest } = details;
    const createdEvent = await prisma.event.create({
      data: {
        ...rest,
        volunteers: volunteers
      }
    });

    return createdEvent;
  }
}

export default EventFormService;
