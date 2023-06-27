import type { NextApiRequest, NextApiResponse } from "next";

import repairRequestModel from "../../models/repairRequest.model";
import validator from "../../validators/repairRequest.validator";

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
  // ? May need to make this multipart/form-data to handle images or
  // ? Use base64.
  // TODO: Get userID from middleware.

  const response = validator.postSchema.safeParse(req.body);
  if (!response.success) {
    const { errors } = response.error;
    return res.status(400).json({
      error: { message: "Invalid fields", errors }
    });
  }

  const { eventId, description, itemType, itemBrand } = req.body;

  try {
    const repairRequest = await repairRequestModel.insert(
      eventId,
      description,
      itemType,
      itemBrand,
      "mock_user" // TODO: change this once we get userID
    );
    return res.status(200).json({
      id: repairRequest.id
    });
  } catch (error) {
    return res.status(500).json("Error inserting into database!");
  }
};
