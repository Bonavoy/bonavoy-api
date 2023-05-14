import crypto from 'crypto'

import { AuthorsOnTrips, Invite, PendingInvite, Resolvers, TripRole } from '@bonavoy/generated/graphql'
import { Context } from '@bonavoy/types/auth'
import { isValidEmail } from '@bonavoy/utils/validators'
import { GraphQLError } from 'graphql'
import { sendInvite } from '@bonavoy/mail'

const inviteResolver: Resolvers = {
  Invite: {
    __resolveType: (obj: PendingInvite | AuthorsOnTrips, _contextValue, _info) => {
      if (!obj.__typename) return null
      return obj.__typename
    },
  },
  Query: {
    invites: async (_parent, { tripId }, ctx: Context) => {
      const invites = await ctx.dataSources.invite.findManyByTripId(tripId)

      return invites.map((invite) => {
        let role = TripRole.Viewer
        switch (invite.role) {
          case TripRole.Editor:
            role = TripRole.Editor
            break
          case TripRole.Author:
            role = TripRole.Author
            break
        }

        return {
          id: invite.id,
          email: invite.email,
          role: role,
        }
      })
    },
  },
  Mutation: {
    sendInvite: async (_parent, { tripId, invitee }, ctx: Context) => {
      if (!isValidEmail(invitee.email)) {
        throw new GraphQLError('Email is not valid')
      }

      const trip = await ctx.dataSources.trips.findTrip(tripId)
      if (!trip) throw new GraphQLError("trip doesn't exist")

      const authorsOnTrip = await ctx.dataSources.authorsOnTrips.find(tripId)
      const invites = await ctx.dataSources.invite.findManyByTripId(tripId)

      if (authorsOnTrip.length + invites.length > 8) {
        throw new GraphQLError('You can only have 8 people invited to a trip')
      }

      await sendInvite(invitee.email, trip)

      // create invite only if user doesn't exist with us because we need
      // to have a way to track who's been invited to this trip so far
      // otherwise add to authors on trip right away
      const user = await ctx.dataSources.users.findUser({ email: invitee.email })
      if (user) {
        let role = invitee.role as TripRole
        const authorOnTrip = await ctx.dataSources.authorsOnTrips.create(user.id, tripId, role)
        let tripRole = role
        switch (authorOnTrip.role) {
          case TripRole.Author:
            tripRole = TripRole.Author
            break
          case TripRole.Editor:
            tripRole = TripRole.Editor
            break
          default:
            tripRole = TripRole.Viewer
        }
        return {
          __typename: 'AuthorsOnTrips',
          id: authorOnTrip.id,
          role: tripRole,
          // args for resolver
          userId: user.id,
          tripId: authorOnTrip.tripId,
          // resolved fields
          user: {} as any,
          trip: {} as any,
        }
      }

      var code = crypto.randomBytes(64).toString('hex') // TODO: don't think we need to generate code

      const existingInvite = await ctx.dataSources.invite.findInvite(invitee.email, tripId)
      if (existingInvite) throw new GraphQLError('Invite already exists')

      const invite = await ctx.dataSources.invite.create({
        tripId,
        email: invitee.email,
        role: invitee.role,
        code,
      })

      return {
        __typename: 'PendingInvite',
        id: invite.id,
        email: invite.email,
        role: invite.role,
      } as Invite
    },
    updateInviteRole: async (_parent, { id, role }, ctx: Context) => {
      const updatedRole = await ctx.dataSources.invite.updateRole(id, role)

      let tripRole = updatedRole.role as TripRole
      switch (updatedRole.role) {
        case TripRole.Author:
          role = TripRole.Author
          break
        case TripRole.Editor:
          role = TripRole.Editor
          break
        default:
          role = TripRole.Viewer
      }

      return {
        __typename: 'PendingInvite',
        id: updatedRole.id,
        email: updatedRole.email,
        role: tripRole,
      }
    },
    deleteInvite: async (_parent, { id }, ctx: Context) => {
      const deletedInvite = await ctx.dataSources.invite.delete(id)

      let role = deletedInvite.role as TripRole
      switch (deletedInvite.role) {
        case TripRole.Author:
          role = TripRole.Author
          break
        case TripRole.Editor:
          role = TripRole.Editor
          break
        default:
          role = TripRole.Viewer
      }
      return deletedInvite.id
    },
  },
}

export default inviteResolver
