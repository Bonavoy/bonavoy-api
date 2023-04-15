/*
  Warnings:

  - You are about to drop the column `mapbox_id` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `place_name` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_location` on the `Transportation` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_time` on the `Transportation` table. All the data in the column will be lost.
  - You are about to drop the column `departure_location` on the `Transportation` table. All the data in the column will be lost.
  - You are about to drop the column `departure_time` on the `Transportation` table. All the data in the column will be lost.
  - Added the required column `mapboxId` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeName` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrivalLocation` to the `Transportation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureLocation` to the `Transportation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "mapbox_id",
DROP COLUMN "place_name",
ADD COLUMN     "mapboxId" TEXT NOT NULL,
ADD COLUMN     "placeName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transportation" DROP COLUMN "arrival_location",
DROP COLUMN "arrival_time",
DROP COLUMN "departure_location",
DROP COLUMN "departure_time",
ADD COLUMN     "arrivalLocation" TEXT NOT NULL,
ADD COLUMN     "arrivalTime" TIMESTAMP(3),
ADD COLUMN     "departureLocation" TEXT NOT NULL,
ADD COLUMN     "departureTime" TIMESTAMP(3);
