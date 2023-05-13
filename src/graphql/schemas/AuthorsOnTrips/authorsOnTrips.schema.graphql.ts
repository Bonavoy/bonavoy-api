import { gql } from 'graphql-tag'

export default gql`
  type Query {
    authorsOnTrips(tripId: ID!): [AuthorsOnTrips!]!
  }

  type Mutation {
    updateAuthorOnTripRole(id: ID!, role: TripRole!): AuthorsOnTrips!
    removeAuthorOnTrip(id: ID!): ID!
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
