import { gql } from 'graphql-tag'

export default gql`
  type AuthorsOnTrips {
    id: ID!
    role: TripRole!
    trip: Trip!
  }

  enum TripRole {
    AUTHOR
    EDITOR
    VIEWER
  }
`
