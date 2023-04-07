/*
  Warnings:

  - You are about to drop the column `coords` on the `Transportation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transportation" DROP COLUMN "coords",
ADD COLUMN     "lat" DECIMAL(65,30),
ADD COLUMN     "lng" DECIMAL(65,30);
