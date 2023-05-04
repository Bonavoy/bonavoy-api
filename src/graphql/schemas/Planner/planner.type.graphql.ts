import { gql } from 'graphql-tag'

export default gql`
  type Query {
    plannerDetails(tripId: ID!): PlannerDetails!
    authorsPresent(tripId: ID!): [AuthorPresent!]!
    activeElements(tripId: ID!): [ActiveElement!]!
  }

  type Mutation {
    # no need to return any data for update, user shouldn't see their own active element on the UI
    updateActiveElement(tripId: ID!, activeElement: UpdateActiveElement!): Boolean!
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

  type PlannerDetails {
    name: String!
    startDate: DateTime!
    endDate: DateTime!
    banner: String!
    places: [Place!]!
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
