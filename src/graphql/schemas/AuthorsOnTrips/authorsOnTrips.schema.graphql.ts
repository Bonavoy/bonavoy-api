import { gql } from 'graphql-tag'

export default gql`
  type Query {
    authorsOnTrips(tripId: ID!): [AuthorsOnTrips!]!
  }

  type Mutation {
    updateAuthorOnTripRole(tripId: ID!, authorId: String!, role: TripRole!): AuthorsOnTrips!
    removeAuthorOnTrip(tripId: ID!, authorId: String!): ID!
  }

  type AuthorsOnTrips {
    id: ID!
    user: User!
    role: TripRole!
    trip: Trip!
  }

  enum TripRole {
    AUTHOR
    EDITOR
    VIEWER
  }
`
