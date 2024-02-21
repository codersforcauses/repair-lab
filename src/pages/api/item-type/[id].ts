import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { itemTypeSchema } from "@/schema/item-type";

export default apiHandler({
  delete: deleteItemType
});

async function deleteItemType(req: NextApiRequest, res: NextApiResponse) {
 
  const { name } = itemTypeSchema.parse(req.body);

  const deleteItemType = await prisma.itemType.delete({
    where: {
      name
    }
  });

  return res.status(200).json(deleteItemType);
}

