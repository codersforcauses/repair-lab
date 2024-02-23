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
  // Run conversion on array
  const responses = await convertEvents(
    !Array.isArray(events) ? [events] : events
  );

  // Single request overload
  if (!Array.isArray(events)) return responses[0];

  // TODO: pagination here - see repairRequestService

  return responses;
}

async function convertEvents(events: Array<Event>): Promise<EventResponse[]> {
  if (events.length <= 0) return [];

  const userIds = events.flatMap((e) => e.createdBy);
  const userMap = await userService.getUserMapFromIds(userIds);

  return events.map((e) => {
    return {
      ...e,
      createdBy: userMap[e.createdBy] ?? userService.unknownUser(e.createdBy),
      startDate: e.startDate.toISOString(),
      endDate: e.endDate.toISOString(),
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString()
    };
  });
}

const eventService = {
  toClientResponse
};

export default eventService;
