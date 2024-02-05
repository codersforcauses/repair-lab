import userService from "@/services/user";
import { Event, EventResponse } from "@/types";

/**
 * Converts a single Event to an EventResponse
 * @param events
 * @returns
 */
async function toClientResponse(events: Event): Promise<EventResponse>;

/**
 * Converts an Event list to an EventResponse list
 * @param events
 * @returns
 */
async function toClientResponse(events: Event[]): Promise<EventResponse[]>;

async function toClientResponse(
  events: Event[] | Event
): Promise<EventResponse[] | EventResponse> {
  if (!Array.isArray(events)) events = [events];

  if (events.length <= 0) return [];

  const userIds = events.flatMap((e) => e.createdBy);
  const userMap = await userService.getUserMapFromIds(userIds);

  const responses: EventResponse[] = events.map((e) => {
    return {
      ...e,
      createdBy: userMap[e.createdBy] ?? userService.unknownUser(e.createdBy),
      startDate: e.startDate.toISOString(),
      endDate: e.endDate.toISOString(),
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString()
    };
  });

  if (!Array.isArray(events)) return responses[0];
  return responses;
}

const eventService = {
  toClientResponse
};

export default eventService;
