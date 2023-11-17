import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  get: getBrands
});

async function getBrands(_req: NextApiRequest, res: NextApiResponse) {
  const brands = await prisma.brand.findMany();

  return res.status(200).json(brands);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
