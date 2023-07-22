import { NextApiRequest, NextApiResponse } from "next";
import { PageConfig } from "next";

import EventService from "@/services/event";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getEvents(req, res);
      break;
    case "POST":
      res.status(405).json("Not yet implemented!");
      break;
    case "PATCH":
      res.status(405).json("Not yet implemented!");
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventService = new EventService();
  const events = await eventService.getAll();

  res.status(200).json(events);
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
