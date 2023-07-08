import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { repairRequestPostSchema } from "@/schema/repair-request";
import RepairRequestService from "@/services/repair-request";

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
  const requestBody = repairRequestPostSchema.safeParse(req.body);
  if (!requestBody.success) {
    const { errors } = requestBody.error;
    return res.status(400).json({ error: errors });
  }

  try {
    const repairRequestService = new RepairRequestService();
    const repairRequest = await repairRequestService.insert({
      ...requestBody.data,
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
