import { gql } from 'graphql-tag'

export default gql`
  #queries
  type Query {
    trips: [Trip!]!
    trip(tripId: ID!): Trip!
  }

  #mutations
  type Mutation {
    createTrip(trip: TripInput!): Trip!
    updateTrip(updateTripInput: UpdateTripInput!): Trip!
    deleteTrip(id: ID!): Boolean!
  }

  #inputs
  input TripInput {
    name: String!
    places: [PlaceInput!]!
    startDate: DateTime!
    endDate: DateTime!
    isPublic: Boolean!
  }

  input UpdateTripInput {
    name: String
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
    places: [Place!]!
    banner: String!
    startDate: DateTime!
    endDate: DateTime!
  }
`
