import type { NextApiRequest, NextApiResponse } from "next";

import brandModel from "@/models/brand.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getBrands(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const getBrands = async (req: NextApiRequest, res: NextApiResponse) => {
  const brands = await brandModel.getAll();
  return res.status(200).json(brands);
};

export const config = {
  api: {
    externalResolver: true as boolean
  }
};
