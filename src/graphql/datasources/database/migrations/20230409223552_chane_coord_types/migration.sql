/*
  Warnings:

  - You are about to alter the column `arrivalLat` on the `Transportation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `arrivalLng` on the `Transportation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `departureLat` on the `Transportation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `departureLng` on the `Transportation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Transportation" ALTER COLUMN "arrivalLat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "arrivalLng" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "departureLat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "departureLng" SET DATA TYPE DOUBLE PRECISION;
