import { NextApiRequest, NextApiResponse } from "next";
import { PageConfig } from "next";

import apiHandler from "@/lib/api-handler";
import EventService from "@/services/event";

export default apiHandler({
  get: getEventOptions
});

async function getEventOptions(req: NextApiRequest, res: NextApiResponse) {
  const eventService = new EventService();
  const events = await eventService.getAll({
    id: true,
    name: true
  });

  res.status(200).json(events);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
