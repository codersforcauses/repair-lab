/*
  Warnings:

  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_organisationId_fkey";

-- DropTable
DROP TABLE "Roles";

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
