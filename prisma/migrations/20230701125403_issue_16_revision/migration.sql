/*
  Warnings:

  - The values [UNDER_REPAIR] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemStatus_new" AS ENUM ('REPAIRED', 'FAILED', 'UNFINISHED');
ALTER TABLE "RepairRequest" ALTER COLUMN "itemStatus" DROP DEFAULT;
ALTER TABLE "RepairRequest" ALTER COLUMN "itemStatus" TYPE "ItemStatus_new" USING ("itemStatus"::text::"ItemStatus_new");
ALTER TYPE "ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "ItemStatus_old";
ALTER TABLE "RepairRequest" ALTER COLUMN "itemStatus" SET DEFAULT 'UNFINISHED';
COMMIT;

-- AlterTable
ALTER TABLE "RepairRequest" ALTER COLUMN "itemMaterial" SET DEFAULT '',
ALTER COLUMN "itemStatus" SET DEFAULT 'UNFINISHED',
ALTER COLUMN "spareParts" SET DEFAULT '';
