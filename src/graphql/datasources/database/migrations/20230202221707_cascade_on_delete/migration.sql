-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_dayPlanId_fkey";

-- DropForeignKey
ALTER TABLE "DayPlan" DROP CONSTRAINT "DayPlan_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_tripId_fkey";

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayPlan" ADD CONSTRAINT "DayPlan_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_dayPlanId_fkey" FOREIGN KEY ("dayPlanId") REFERENCES "DayPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
