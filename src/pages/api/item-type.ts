import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  get: getItemTypes
});

async function getItemTypes(req: NextApiRequest, res: NextApiResponse) {
  const itemTypes = await prisma.itemType.findMany({});

  return res.status(200).json(itemTypes);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
