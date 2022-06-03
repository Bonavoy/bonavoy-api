import { User } from './User';
import { Location } from './Location';
import { SpotOfInterest } from './SpotOfInterest';
import { Trip } from './Trip';

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Location.resolvers.queries,
    ...SpotOfInterest.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Location.resolvers.mutations,
    ...SpotOfInterest.resolvers.mutations,
    ...Trip.resolvers.mutations,
  },
};

export default resolvers;
