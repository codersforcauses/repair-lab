/*
  Warnings:

  - The values [COMPLETED,UNFINISHED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'REPAIRED', 'FAILED');
ALTER TABLE "RepairRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "RepairRequest" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "RepairRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
