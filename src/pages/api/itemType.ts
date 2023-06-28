import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getItemTypes(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const getItemTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  const itemtypes = await prisma.itemType.findMany();

  return res.status(200).json(itemtypes);
};

export const config = {};
