import mongoose from 'mongoose';

import { MongoDataSource } from 'apollo-datasource-mongodb';
// import { extractTripValues } from '../../utils/database';

//types
import { MongoTrip } from '../models/trip';

// db models
import Place from '../models/place';
// import DayPlan from '../models/dayPlan';
// import SpotOfInterest from '../models/spotOfInterest';
import Trip from '../models/trip';

export default class Trips extends MongoDataSource<MongoTrip> {
  //IDK HOW SESSIONS WORK WITH DATASOURCES & CACHING LOL XD
  //TODO: FIX ISSUE ABOVE
  async createTrip(trip: MongoTrip) {
    const { name, author, participants, isPublic, places } = trip;

    const session = await mongoose.startSession();
    session.startTransaction();

    let newTrip: any;
    try {
      //   // rip if you gotta read this shit
      //   // extract spotsOfInterest, dayPlan and places
      //   const extractedSpotsOfInterests = [];
      //   extractTripValues(trip, 'spotsOfInterest', extractedSpotsOfInterests);

      //   const extractedDayPlan = [];
      //   extractTripValues(trip, 'dayPlan', extractedDayPlan);

      //   const extractedPlaces = [];
      //   extractTripValues(trip, 'places', extractedPlaces);

      //   // save spots of interest
      //   const createdSpotsOfInterest = await SpotOfInterest.insertMany(
      //     extractedSpotsOfInterests,
      //     {
      //       session,
      //     }
      //   );

      //   // distribute the ObjectId's of created spots of interest to day plans
      //   const initialValue = 0;
      //   extractedDayPlan.reduce((prevVal, curVal) => {
      //     const dayPlanSpots = createdSpotsOfInterest.slice(
      //       prevVal,
      //       prevVal + curVal.spotsOfInterest.length
      //     );
      //     curVal.spotsOfInterest = dayPlanSpots.map(
      //       (dayPlanSpot) => dayPlanSpot._id
      //     );
      //     return prevVal + curVal.spotsOfInterest.length;
      //   }, initialValue);

      //   // save day plans
      //   const createdDayPlans = await DayPlan.insertMany(extractedDayPlan, {
      //     session,
      //   });

      //   // distribute day plan Id's to each day plan
      //   extractedPlaces.forEach((place, i) => (place.dayPlan = createdDayPlans[i]));

      // save places
      const createdPlaces = await Place.create(places);

      // map to array of just the place id's
      const placeIds = createdPlaces.map((place: any) => place._id);

      // save trip
      newTrip = await Trip.create(
        [
          {
            name,
            author,
            participants,
            isPublic,
            places: placeIds,
          },
        ],
        { session }
      );
      newTrip = newTrip[0];
      await session.commitTransaction();
    } catch (err) {
      console.error(err);
      await session.abortTransaction();
    } finally {
      await session.endSession();
      return newTrip;
    }
  }

  async getTrip(tripId: string) {
    return await Trip.findById(tripId);
  }
}
