import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import apiHandler from "@/lib/api-handler";
import BrandService from "@/services/brand";

export default apiHandler({
  get: getBrands
});

async function getBrands(req: NextApiRequest, res: NextApiResponse) {
  const brandService = new BrandService();
  const brands = await brandService.getAll();

  return res.status(200).json(brands);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
