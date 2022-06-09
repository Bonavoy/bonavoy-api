import { shield } from 'graphql-shield';

//rules
import { isAuthenticated, isNotAlreadyRegistered } from './rules';

export default shield({
  Query: {},
  Mutation: {
    createUser: isNotAlreadyRegistered,
    token: isAuthenticated,
    createTrip: isAuthenticated,
  },
});
