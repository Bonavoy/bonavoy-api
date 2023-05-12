import { gql } from 'graphql-tag'

export default gql`
  type Query {
    invites(tripId: ID!): [PendingInvite!]!
  }

  type Mutation {
    sendInvite(tripId: ID!, invitee: InviteInput!): Invite!
    deleteInvite(id: ID!): PendingInvite!
    updateInviteRole(id: ID!, role: TripRole!): PendingInvite!
  }

  # types
  type PendingInvite {
    id: ID!
    email: String!
    role: TripRole!
  }

  # invite is pending if user not exists yet
  union Invite = AuthorsOnTrips | PendingInvite

  # inputs
  input InviteInput {
    email: String!
    role: TripRole!
  }
`
