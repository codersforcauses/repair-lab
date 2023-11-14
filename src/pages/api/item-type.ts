import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import apiHandler from "@/lib/api-handler";
import ItemTypeService from "@/services/item-type";

export default apiHandler({
  get: getItemTypes
});

async function getItemTypes(req: NextApiRequest, res: NextApiResponse) {
  const itemTypeService = new ItemTypeService();
  const itemtypes = await itemTypeService.getAll();

  return res.status(200).json(itemtypes);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
