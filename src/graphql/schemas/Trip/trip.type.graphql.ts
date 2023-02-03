import { gql } from 'graphql-tag'

export default gql`
  #queries
  type Query {
    trips(limit: Int!, after: ID): TripConnection!
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
  type TripConnection {
    edges: [TripEdge!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type TripEdge {
    node: Trip!
  }

  type PageInfo {
    endCursor: ID! # fetch after this id for next page
    hasNextPage: Boolean!
  }

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
