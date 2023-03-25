-- CreateEnum
CREATE TYPE "TransportationType" AS ENUM ('CAR', 'PLANE', 'BUS');

-- CreateTable
CREATE TABLE "Transportation" (
    "id" TEXT NOT NULL,
    "type" "TransportationType" NOT NULL,
    "placeId" TEXT NOT NULL,
    "departure_location" TEXT NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_location" TEXT NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "details" VARCHAR(300) NOT NULL,

    CONSTRAINT "Transportation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transportation" ADD CONSTRAINT "Transportation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
