/*
  Warnings:

  - You are about to drop the column `volunteers` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('REPAIRER', 'EVENT_MANAGER', 'ORG_ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "volunteers";

-- CreateTable
CREATE TABLE "EventRepairer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventRepairer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventRepairer_userId_eventId_key" ON "EventRepairer"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_name_key" ON "Organisation"("name");

-- AddForeignKey
ALTER TABLE "EventRepairer" ADD CONSTRAINT "EventRepairer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
