import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  delete: deleteItemType
});

async function deleteItemType(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const deletedItemType = await prisma.itemType.delete({
    where: {
      name: id as string
    }
  });

  return res.status(200).json({ name: deletedItemType.name });
}
