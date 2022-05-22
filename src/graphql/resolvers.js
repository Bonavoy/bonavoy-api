import { User } from './User';
import { SpotOfInterest } from './SpotOfInterest';

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...SpotOfInterest.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...SpotOfInterest.resolvers.mutations,
  },
};

export default resolvers;
