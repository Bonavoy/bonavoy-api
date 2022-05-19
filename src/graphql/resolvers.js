import { User } from './User';
import { Location } from './Location';

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Location.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Location.resolvers.mutations,
  },
};

export default resolvers;
