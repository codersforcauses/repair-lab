import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { eventFormPostSchema } from "@/schema/event-form";
import EventFormService from "@/services/event-form";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(405).json("Not yet implemented!");
      break;
    case "POST":
      await createEventForm(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const createEventForm = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: Get userID from middleware.
  const requestBody = eventFormPostSchema.safeParse(req.body);
  if (!requestBody.success) {
    const { errors } = requestBody.error;
    return res.status(400).json({ error: errors });
  }

  try {
    const eventFormService = new EventFormService();
    const eventForm = await eventFormService.insert({
      ...requestBody.data,
      createdBy: "mock_user" // TODO: change this once we get userID
    });

    return res.status(200).json({
      id: eventForm.id
    });
  } catch (error) {
    return res.status(500).json("Error inserting into database!");
  }
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
