/*
  Warnings:

  - You are about to drop the column `organisationId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `Organisation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_organisationId_fkey";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "organisationId";

-- DropTable
DROP TABLE "Organisation";

-- CreateIndex
CREATE UNIQUE INDEX "Staff_clerkId_key" ON "Staff"("clerkId");
