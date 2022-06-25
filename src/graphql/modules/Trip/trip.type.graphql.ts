import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    getTrip(tripId: ID): Trip
  }

  #mutations
  type Mutation {
    createTrip(trip: TripInput): Trip
  }

  #inputs
  input TripInput {
    name: String
    isPublic: Boolean
  }

  #types
  type Trip {
    id: ID
    name: String
    isPublic: Boolean
  }
`
