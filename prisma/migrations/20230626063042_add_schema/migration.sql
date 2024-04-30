-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "volunteers" TEXT[],
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repair_request" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "item_type" TEXT NOT NULL,
    "item_brand" TEXT NOT NULL,

    CONSTRAINT "Repair_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_type" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Item_type_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Brand" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Repair_Request_Image" (
    "id" TEXT NOT NULL,
    "s3_key" TEXT NOT NULL,
    "repair_request_id" TEXT NOT NULL,

    CONSTRAINT "Repair_Request_Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- AddForeignKey
ALTER TABLE "Repair_request" ADD CONSTRAINT "Repair_request_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair_request" ADD CONSTRAINT "Repair_request_item_type_fkey" FOREIGN KEY ("item_type") REFERENCES "Item_type"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair_request" ADD CONSTRAINT "Repair_request_item_brand_fkey" FOREIGN KEY ("item_brand") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair_Request_Image" ADD CONSTRAINT "Repair_Request_Image_repair_request_id_fkey" FOREIGN KEY ("repair_request_id") REFERENCES "Repair_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
