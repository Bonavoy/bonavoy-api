import { gql } from 'graphql-tag'

export default gql`
  type Query {
    authorsPresent(tripId: ID!): [AuthorPresent!]!
    activeElements(tripId: ID!): [ActiveElement!]!
  }

  type Mutation {
    updateActiveElement(tripId: ID!, activeElement: UpdateActiveElement!): ActiveElement!
  }

  type Subscription {
    listenAuthorPresent(tripId: ID!): AuthorPresent!
    listenActiveElement(tripId: ID!): ActiveElement!
  }

  input UpdateActiveElement {
    userId: ID!
    elementId: ID!
    active: Boolean!
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

  type ActiveElement {
    author: AuthorPresent!
    tripId: ID!
    elementId: ID!
    active: Boolean!
  }
`
