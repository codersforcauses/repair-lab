/*
  Warnings:

  - You are about to drop the column `volunteers` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "volunteers";

-- CreateTable
CREATE TABLE "EventRepairer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventRepairer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventRepairer_userId_eventId_key" ON "EventRepairer"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "EventRepairer" ADD CONSTRAINT "EventRepairer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
