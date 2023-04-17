import { gql } from 'graphql-tag'

export default gql`
  type Query {
    authorsPresent(tripId: ID!): [AuthorPresent!]!
  }

  type Subscription {
    listenAuthorPresent(tripId: ID!): AuthorPresent!
  }

  type AuthorPresent {
    id: ID!
    username: String!
    email: String!
    firstname: String!
    lastname: String!
    avatar: String!
    connected: Boolean!
  }
`
