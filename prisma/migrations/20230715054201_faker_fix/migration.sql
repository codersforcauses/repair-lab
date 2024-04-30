/*
  Warnings:

  - Added the required column `thumbnailImage` to the `RepairRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RepairRequest" ADD COLUMN     "hoursWorked" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "repairComment" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "thumbnailImage" TEXT NOT NULL,
ALTER COLUMN "comment" DROP DEFAULT;
