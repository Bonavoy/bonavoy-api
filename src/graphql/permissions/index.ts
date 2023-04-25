import { shield } from 'graphql-shield'

//rules
import { isAuthenticated, isSession } from './rules'

export default shield(
  {
    Query: {
      user: isAuthenticated,
      trips: isAuthenticated,
      trip: isAuthenticated,
      places: isAuthenticated,
      place: isAuthenticated,
      transportation: isAuthenticated,
    },
    Mutation: {
      token: isSession,
      createTrip: isAuthenticated,
      updateTrip: isAuthenticated,
      deleteTrip: isAuthenticated,
      createPlace: isAuthenticated,
      updatePlace: isAuthenticated,
      deletePlace: isAuthenticated,
      addTransportation: isAuthenticated,
      updateTransportation: isAuthenticated,
      deleteTransportation: isAuthenticated,
    },
  },
  { debug: process.env.NODE_ENV === 'development' },
)
