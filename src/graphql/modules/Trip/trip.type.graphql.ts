import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    getTrip(tripId: ID): Trip
    trips: [Trip]
  }

  #mutations
  type Mutation {
    createTrip(trip: TripInput): Trip!
    updateTripName(tripId: ID!, name: String!): String!
  }

  #inputs
  input TripInput {
    name: String
    places: [PlaceInput]
    startDate: DateTime
    endDate: DateTime
    isPublic: Boolean
  }

  #types
  type Trip {
    id: ID!
    name: String!
    isPublic: Boolean!
    authors: [AuthorsOnTrips!]!
    places: [Place]
    banner: String!
    startDate: DateTime!
    endDate: DateTime!
  }
`
