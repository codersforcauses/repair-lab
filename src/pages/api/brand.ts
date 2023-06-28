import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

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
  const brands = await prisma.brand.findMany();

  return res.status(200).json(brands);
};

export const config = {};
