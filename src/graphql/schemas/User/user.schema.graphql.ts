import { gql } from 'graphql-tag'

export default gql`
  #queries
  type Query {
    user: User!
  }

  #mutations
  type Mutation {
    createUser(userInput: UserInput!): User!
    authenticate(username: String!, password: String!): Boolean!
    token: Boolean!
  }

  #input
  input UserInput {
    username: String!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  #types
  type User {
    id: ID!
    email: String!
    username: String!
    firstname: String!
    lastname: String!
    avatar: String
    verified: Boolean!
    authorsOnTrips: [AuthorsOnTrips!]!
  }

  type AuthorsOnTrips {
    id: ID!
    role: TripRole!
    tripId: ID!
    trip: Trip!
  }

  enum TripRole {
    AUTHOR
    EDITOR
    VIEWER
  }
`