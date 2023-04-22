import { gql } from 'graphql-tag'

export default gql`
  type Query {
    invites(tripId: ID!): [PendingInvite!]!
  }

  type Mutation {
    sendInvite(tripId: ID!, invitee: InviteInput!): Invite!
  }

  # types
  type PendingInvite {
    email: String!
    role: TripRole!
  }

  union Invite = AuthorsOnTrips | PendingInvite

  # inputs
  input InviteInput {
    email: String!
    role: TripRole!
  }
`
