/* eslint-disable no-unused-vars */

import { Brand } from "@prisma/client";

import prisma from "@/lib/prisma";

interface IBrandService {
  getAll(): Promise<Brand[]>;
}

class BrandService implements IBrandService {
  async getAll(): Promise<Brand[]> {
    return await prisma.brand.findMany();
  }
}

export default BrandService;
