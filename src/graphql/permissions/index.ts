import { shield } from 'graphql-shield';

//rules
import { isAuthenticated, isSession } from './rules';

export default shield({
  Query: {},
  Mutation: {
    token: isSession,
    createTrip: isAuthenticated,
  },
});
