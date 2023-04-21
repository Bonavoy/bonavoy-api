import { gql } from 'graphql-tag'

export default gql`
  type Query {
    invites(tripId: ID!): [Invite!]!
  }

  type Mutation {
    sendInvite(tripId: ID!, invitee: InviteInput!): Invite!
  }

  # types
  type Invite {
    email: String!
    role: TripRole!
  }

  # inputs
  input InviteInput {
    email: String!
    role: TripRole!
  }
`
