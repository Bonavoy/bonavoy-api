import { Location } from './Location';
import { SpotOfInterest } from './SpotOfInterest';
import { Trip } from './Trip';

const resolvers = {
  Query: {
    ...Location.resolvers.queries,
    ...SpotOfInterest.resolvers.queries,
  },
  Mutation: {
    ...Location.resolvers.mutations,
    ...SpotOfInterest.resolvers.mutations,
    ...Trip.resolvers.mutations,
  },
};

export default resolvers;
