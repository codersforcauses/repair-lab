/*
  Warnings:

  - You are about to drop the column `itemStatus` on the `RepairRequest` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'REPAIRED';
ALTER TYPE "Status" ADD VALUE 'FAILED';
ALTER TYPE "Status" ADD VALUE 'UNFINISHED';

-- AlterTable
ALTER TABLE "RepairRequest" DROP COLUMN "itemStatus";

-- DropEnum
DROP TYPE "ItemStatus";
