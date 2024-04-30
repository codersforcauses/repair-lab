/*
  Warnings:

  - The `status` column on the `RepairRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'REPAIRED', 'FAILED');

-- AlterTable
ALTER TABLE "RepairRequest" DROP COLUMN "status",
ADD COLUMN     "status" "RepairStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Status";
