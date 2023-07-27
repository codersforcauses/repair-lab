import { NextApiRequest, NextApiResponse } from "next";
import { PageConfig } from "next";

import EventService from "@/services/event";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getEventOptions(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const getEventOptions = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventService = new EventService();
  const events = await eventService.getAll({
    id: true,
    name: true
  });

  res.status(200).json(events);
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
