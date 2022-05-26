import mongoose from 'mongoose';
import DayPlan from '../models/dayPlan';
import Place from '../models/place';
import Trip from '../models/trip';

export const createTrip = async (trip) => {
  const { name, author, participants, isPublic, places } = trip;

  const session = await mongoose.startSession();
  session.startTransaction();

  let newTrip;
  try {
    const createdPlaces = await Place.insertMany(places, { session });
    const createdPlacesIds = createdPlaces.map((place) => place._id);

    newTrip = await Trip.create(
      [
        {
          name,
          author,
          participants,
          isPublic,
          places: createdPlacesIds,
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
