import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields } from "formidable";

import repairRequestModel from "@/models/repairRequest.model";
import validator from "@/validators/repairRequest.validator";

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
  const form = formidable({});
  const [fields, files] = await form.parse(req);

  const response = validateFormFields(fields);
  if (!response.success) {
    const { errors } = response.error;
    return res.status(400).json({ error: errors });
  }

  try {
    const { eventId, description, itemType, itemBrand } = response.data;
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

const validateFormFields = (fields: Fields) => {
  const response = validator.postSchema.safeParse({
    eventId: fields.eventId?.[0],
    description: fields.description?.[0],
    itemType: fields.itemType?.[0],
    itemBrand: fields.itemBrand?.[0]
  });

  return response;
};

export const config = {
  api: {
    bodyParser: false
  }
};
