import type { NextApiRequest, NextApiResponse } from "next";

import { Brand } from "@/hooks/brands";
import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  get: getBrands
});

async function getBrands(_req: NextApiRequest, res: NextApiResponse<Brand[]>) {
  const brands = await prisma.brand.findMany();

  return res.status(200).json(brands);
}
