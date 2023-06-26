import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      // handleGetRequest
      break;
    case "POST":
      createRepairRequest(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const postSchema = z.object({
  eventID: z.string(),
  description: z.string(),
  itemType: z.string(),
  itemBrand: z.string()
});

const createRepairRequest = (req: NextApiRequest, res: NextApiResponse) => {
  // ? May need to make this multipart/form-data to handle images or
  // ? Use base64.

  // TODO: Get userID from middleware.

  // validate post body
  const response = postSchema.safeParse(req.body);
  if (!response.success) {
    const { errors } = response.error;
    return res.status(400).json({
      error: { message: "Invalid fields", errors }
    });
  }

  // TODO: Create new repair request in database.
  return res.status(200).json(req.body);
};

export const config = {};
