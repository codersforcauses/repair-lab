import type { NextApiRequest, NextApiResponse } from "next";

import { ItemType } from "@/hooks/item-types";
import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { itemTypeSchema } from "@/schema/item-type";

export default apiHandler({
  get: getItemTypes,
  post: createItemType
});

async function getItemTypes(
  req: NextApiRequest,
  res: NextApiResponse<ItemType[]>
) {
  const itemTypes = await prisma.itemType.findMany({});

  return res.status(200).json(itemTypes);
}

async function createItemType(req: NextApiRequest, res: NextApiResponse) {
  // const { userId } = getAuth(req);
  const { name } = itemTypeSchema.parse(req.body);

  const createdIemType = await prisma.itemType.create({
    data: {
      name
    }
  });
  return res.status(200).json({ name: createdIemType.name });
}
