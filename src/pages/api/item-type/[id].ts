import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  delete: deleteItemType
});

async function deleteItemType(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const deletedItemType = await prisma.itemType.delete({
      where: {
        name: id as string
      }
    });
    return res.status(200).json({ name: deletedItemType.name });
  } catch (PrismaClientKnownRequestError) {
    throw new ApiError(HttpStatusCode.NotFound, "Item not found");
  }
}
