/*
  Warnings:

  - You are about to drop the `Item_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RepairRequest" DROP CONSTRAINT "RepairRequest_itemType_fkey";

-- DropTable
DROP TABLE "Item_type";

-- CreateTable
CREATE TABLE "ItemType" (
    "name" TEXT NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "RepairRequest" ADD CONSTRAINT "RepairRequest_itemType_fkey" FOREIGN KEY ("itemType") REFERENCES "ItemType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
