-- CreateEnum
CREATE TYPE "ForeignType" AS ENUM ('TRANSPORTATION');

-- CreateTable
CREATE TABLE "FileAttachment" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "foreignType" "ForeignType" NOT NULL,
    "foreignId" TEXT NOT NULL,

    CONSTRAINT "FileAttachment_pkey" PRIMARY KEY ("id")
);
