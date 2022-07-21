/*
  Warnings:

  - You are about to drop the column `duration` on the `Place` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "duration",
ADD COLUMN     "bbox" DOUBLE PRECISION[],
ADD COLUMN     "center" DOUBLE PRECISION[],
ADD COLUMN     "geometry" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "endDate" DROP DEFAULT,
ALTER COLUMN "startDate" DROP DEFAULT;
