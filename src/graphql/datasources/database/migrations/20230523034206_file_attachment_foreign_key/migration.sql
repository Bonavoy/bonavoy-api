/*
  Warnings:

  - You are about to drop the column `foreignId` on the `FileAttachment` table. All the data in the column will be lost.
  - You are about to drop the column `foreignType` on the `FileAttachment` table. All the data in the column will be lost.
  - Added the required column `transportationId` to the `FileAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileAttachment" DROP COLUMN "foreignId",
DROP COLUMN "foreignType",
ADD COLUMN     "transportationId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ForeignType";

-- AddForeignKey
ALTER TABLE "FileAttachment" ADD CONSTRAINT "FileAttachment_transportationId_fkey" FOREIGN KEY ("transportationId") REFERENCES "Transportation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
