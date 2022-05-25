import mongoose from 'mongoose';
import Place from '../models/place';
import Trip from '../models/trip';

export const createTrip = async (trip) => {
  const { name, author, participants, isPublic, places } = trip;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const createdPlaces = await Place.insertMany(places, { session });
    console.log(createdPlaces);
    const createdPlacesIds = createdPlaces.map((place) => place._id);
    const tp = await Trip.create(
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
    console.log('hi', tp);
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
  } finally {
    await session.commitTransaction();
    await session.endSession();
  }
};
