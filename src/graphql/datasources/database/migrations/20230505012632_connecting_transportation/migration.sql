-- AlterTable
ALTER TABLE "Transportation" ADD COLUMN     "connectingId" TEXT,
ADD COLUMN     "connectingOrder" INTEGER DEFAULT 0;
