/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventType` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedTo` to the `RepairRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `RepairRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemMaterial` to the `RepairRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spareParts` to the `RepairRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('REPAIRED', 'FAILED', 'UNDER_REPAIR');

-- DropForeignKey
ALTER TABLE "RepairRequest" DROP CONSTRAINT "RepairRequest_itemBrand_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "disclaimer" TEXT NOT NULL DEFAULT 'This is not the default disclaimer',
ADD COLUMN     "eventType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RepairRequest" ADD COLUMN     "assignedTo" TEXT NOT NULL,
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "itemMaterial" TEXT NOT NULL,
ADD COLUMN     "itemStatus" "ItemStatus" NOT NULL DEFAULT 'UNDER_REPAIR',
ADD COLUMN     "spareParts" TEXT NOT NULL;

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "EventImage" (
    "id" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "RepairEventId" TEXT NOT NULL,

    CONSTRAINT "EventImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventType_fkey" FOREIGN KEY ("eventType") REFERENCES "ItemType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_RepairEventId_fkey" FOREIGN KEY ("RepairEventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
