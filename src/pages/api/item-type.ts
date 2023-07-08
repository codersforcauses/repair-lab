import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import ItemTypeService from "@/services/item-type";

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
  const itemTypeService = new ItemTypeService();
  const itemtypes = await itemTypeService.getAll();

  return res.status(200).json(itemtypes);
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
