import type { NextApiRequest, NextApiResponse } from "next";
import { ItemType } from "@prisma/client";

import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ItemType[]>
) {
  const itemTypes = await prisma.itemtype.findMany();
  return res.status(200).json(itemTypes);
}
