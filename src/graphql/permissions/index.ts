import { shield } from 'graphql-shield'

//rules
import { isAuthenticated, isSession } from './rules'

export default shield(
  {
    Query: {
      user: isAuthenticated,
      trips: isAuthenticated,
    },
    Mutation: {
      token: isSession,
      createTrip: isAuthenticated,
    },
  },
  { debug: process.env.NODE_ENV === 'development' },
)
