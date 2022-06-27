import { shield } from 'graphql-shield'

//rules
import { isAuthenticated, isSession } from './rules'

export default shield(
  {
    Query: {
      user: isAuthenticated,
    },
    Mutation: {
      token: isSession,
      createTrip: isAuthenticated,
    },
  },
  {
    debug: true,
  },
)
