import { createTrip } from '../../database/crud/trip';

const mutations = {
  createTrip: async (_, { trip }) => {
    const res = await createTrip(trip);
    const arr = [];
    return {};
  },
};

export const resolvers = { mutations };
