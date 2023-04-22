/*
  Warnings:

  - A unique constraint covering the columns `[userId,tripId]` on the table `AuthorsOnTrips` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AuthorsOnTrips_userId_tripId_key" ON "AuthorsOnTrips"("userId", "tripId");
