/*
  Warnings:

  - You are about to drop the column `RepairEventId` on the `EventImage` table. All the data in the column will be lost.
  - Added the required column `repairEventId` to the `EventImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventImage" DROP CONSTRAINT "EventImage_RepairEventId_fkey";

-- AlterTable
ALTER TABLE "EventImage" DROP COLUMN "RepairEventId",
ADD COLUMN     "repairEventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RepairRequest" ALTER COLUMN "assignedTo" SET DEFAULT '',
ALTER COLUMN "comment" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_repairEventId_fkey" FOREIGN KEY ("repairEventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
