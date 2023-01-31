import { gql } from 'graphql-tag'

export default gql`
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
