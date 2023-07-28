/* eslint-disable no-unused-vars */

import { Event } from "@prisma/client";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

interface IEventService {
  getAll(select?: Prisma.EventSelect): Promise<Partial<Event>[]>;
}

class EventService implements IEventService {
  async getAll(select?: Prisma.EventSelect): Promise<Partial<Event>[]> {
    return await prisma.event.findMany({
      select: select
    });
  }
}

export default EventService;
