/*
  Warnings:

  - A unique constraint covering the columns `[email,tripId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invite_email_tripId_key" ON "Invite"("email", "tripId");
