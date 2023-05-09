/*
  Warnings:

  - Made the column `connectingId` on table `Transportation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `connectingOrder` on table `Transportation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transportation" ALTER COLUMN "connectingId" SET NOT NULL,
ALTER COLUMN "connectingOrder" SET NOT NULL;
