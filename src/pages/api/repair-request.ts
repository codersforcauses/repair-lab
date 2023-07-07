import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { repairRequestPostSchema } from "@/schema/repair-request";
import repairRequestService from "@/services/repair-request.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(405).json("Not yet implemented!");
      break;
    case "POST":
      await createRepairRequest(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const createRepairRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // TODO: Get userID from middleware.
  const response = repairRequestPostSchema.safeParse(req.body);
  if (!response.success) {
    const { errors } = response.error;
    return res.status(400).json({ error: errors });
  }

  try {
    const repairRequest = await repairRequestService.insert({
      ...response.data,
      createdBy: "mock_user" // TODO: change this once we get userID
    });

    return res.status(200).json({
      id: repairRequest.id
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
