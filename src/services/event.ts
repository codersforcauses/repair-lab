import userService from "@/services/user";
import { Event, EventResponse, EventWithRepairers } from "@/types";

const toClientResponse = async (
  events: Event[] | EventWithRepairers[]
): Promise<EventResponse[]> => {
  if (events.length <= 0) return [];

  const userIds = events.flatMap((e) =>
    "eventRepairer" in e
      ? [e.createdBy, ...e.eventRepairer.flatMap((repairer) => repairer.id)]
      : [e.createdBy]
  );
  const userMap = await userService.getUserMapFromIds(userIds);

  const responses: EventResponse[] = events.map((e) => {
    return {
      ...e,
      createdBy: userMap[e.createdBy] ?? userService.unknownUser(e.createdBy),
      startDate: e.startDate.toISOString(),
      endDate: e.startDate.toISOString(),
      createdAt: e.startDate.toISOString(),
      updatedAt: e.startDate.toISOString(),
      // empty array if no repairers passed
      eventRepairer:
        "eventRepairer" in e
          ? e.eventRepairer.map(
              (r) => userMap[r.userId] ?? userService.unknownUser(r.userId)
            )
          : []
    };
  });
  return responses;
};

const eventService = {
  toClientResponse
};

export default eventService;
