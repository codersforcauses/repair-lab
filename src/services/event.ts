import userService from "@/services/user";
import { Event, EventResponse } from "@/types";

const toClientResponse = async (events: Event[]): Promise<EventResponse[]> => {
  const userIds = events.flatMap((e) => [e.createdBy, ...e.volunteers]);

  const userMap = await userService.getUserMapFromIds(userIds);

  const responses: EventResponse[] = events.map((e) => {
    return {
      ...e,
      createdBy: userMap[e.createdBy] ?? userService.unknownUser(e.createdBy),
      startDate: e.startDate.toISOString(),
      endDate: e.startDate.toISOString(),
      createdAt: e.startDate.toISOString(),
      updatedAt: e.startDate.toISOString(),
      volunteers: e.volunteers.map(
        (v) => userMap[v] ?? userService.unknownUser(v)
      )
    };
  });
  return responses;
};

const eventService = {
  toClientResponse
};

export default eventService;
