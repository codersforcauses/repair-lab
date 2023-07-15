/*
  Warnings:

  - You are about to drop the column `creation_date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `creator` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Repair_Request_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Repair_request` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Repair_Request_Image" DROP CONSTRAINT "Repair_Request_Image_repair_request_id_fkey";

-- DropForeignKey
ALTER TABLE "Repair_request" DROP CONSTRAINT "Repair_request_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Repair_request" DROP CONSTRAINT "Repair_request_item_brand_fkey";

-- DropForeignKey
ALTER TABLE "Repair_request" DROP CONSTRAINT "Repair_request_item_type_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "creation_date",
DROP COLUMN "creator",
DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Repair_Request_Image";

-- DropTable
DROP TABLE "Repair_request";

-- CreateTable
CREATE TABLE "RepairRequest" (
    "id" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "description" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemBrand" TEXT NOT NULL,

    CONSTRAINT "RepairRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepairRequestImage" (
    "id" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "repairRequestId" TEXT NOT NULL,

    CONSTRAINT "RepairRequestImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepairRequest" ADD CONSTRAINT "RepairRequest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairRequest" ADD CONSTRAINT "RepairRequest_itemType_fkey" FOREIGN KEY ("itemType") REFERENCES "Item_type"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairRequest" ADD CONSTRAINT "RepairRequest_itemBrand_fkey" FOREIGN KEY ("itemBrand") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairRequestImage" ADD CONSTRAINT "RepairRequestImage_repairRequestId_fkey" FOREIGN KEY ("repairRequestId") REFERENCES "RepairRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
