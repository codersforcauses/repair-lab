/* eslint-disable no-unused-vars */

import { ItemType } from "@prisma/client";

import prisma from "@/lib/prisma";

interface IItemTypeService {
  getAll(): Promise<ItemType[]>;
}

class ItemTypeService implements IItemTypeService {
  async getAll(): Promise<ItemType[]> {
    return await prisma.itemType.findMany();
  }
}

export default ItemTypeService;
