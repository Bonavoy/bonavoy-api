/*
  Warnings:

  - You are about to drop the column `lat` on the `Transportation` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Transportation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transportation" DROP COLUMN "lat",
DROP COLUMN "lng",
ADD COLUMN     "arrivalLat" DECIMAL(65,30),
ADD COLUMN     "arrivalLng" DECIMAL(65,30),
ADD COLUMN     "departureLat" DECIMAL(65,30),
ADD COLUMN     "departureLng" DECIMAL(65,30);
