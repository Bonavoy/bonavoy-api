import mongoose from 'mongoose';
import { extractTripValues } from '../../utils/database';
import DayPlan from '../models/dayPlan';
import Place from '../models/place';
import SpotOfInterest from '../models/spotOfInterest';
import Trip from '../models/trip';

export const createTrip = async (trip) => {
  const { name, author, participants, isPublic, places } = trip;

  const session = await mongoose.startSession();
  session.startTransaction();

  let newTrip;
  try {
    // rip if you gotta read this shit
    // extract spotsOfInterest, dayPlan and places
    const extractedSpotsOfInterests = [];
    extractTripValues(trip, 'spotsOfInterest', extractedSpotsOfInterests);

    const extractedDayPlan = [];
    extractTripValues(trip, 'dayPlan', extractedDayPlan);

    const extractedPlaces = [];
    extractTripValues(trip, 'places', extractedPlaces);

    // save spots of interest
    const createdSpotsOfInterest = await SpotOfInterest.insertMany(
      extractedSpotsOfInterests,
      {
        session,
      }
    );

    // distribute the ObjectId's of created spots of interest to day plans
    const initialValue = 0;
    extractedDayPlan.reduce((prevVal, curVal) => {
      const dayPlanSpots = createdSpotsOfInterest.slice(
        prevVal,
        prevVal + curVal.spotsOfInterest.length
      );
      curVal.spotsOfInterest = dayPlanSpots.map(
        (dayPlanSpot) => dayPlanSpot._id
      );
      return prevVal + curVal.spotsOfInterest.length;
    }, initialValue);

    // save day plans
    const createdDayPlans = await DayPlan.insertMany(extractedDayPlan, {
      session,
    });

    // distribute day plan Id's to each day plan
    extractedPlaces.forEach((place, i) => (place.dayPlan = createdDayPlans[i]));

    // save places
    const createdPlaces = await Place.insertMany(extractedPlaces, { session });

    // map to array of just the place id's
    const placeIds = createdPlaces.map((place) => place._id);

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
    await session.commitTransaction();
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};
