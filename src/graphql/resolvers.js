import { User } from './User';
import { SpotOfInterest } from './SpotOfInterest';
import { Trip } from './Trip';

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...SpotOfInterest.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...SpotOfInterest.resolvers.mutations,
    ...Trip.resolvers.mutations,
  },
};

export default resolvers;
