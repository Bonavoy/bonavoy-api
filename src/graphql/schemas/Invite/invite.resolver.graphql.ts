import crypto from 'crypto'

import { Resolvers, TripRole } from '@bonavoy/generated/graphql'
import { Context } from '@bonavoy/types/auth'
import { isValidEmail } from '@bonavoy/utils/validators'
import { GraphQLError } from 'graphql'
import { sendInvite } from '@bonavoy/mail'

const inviteResolver: Resolvers = {
  Query: {
    invites: async (_parent, { tripId }, ctx: Context) => {
      const invites = await ctx.dataSources.invite.findMany(tripId)

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

      var code = crypto.randomBytes(64).toString('hex')

      const invite = await ctx.dataSources.invite.create({
        tripId,
        email: invitee.email,
        role: invitee.role,
        code,
      })

      const trip = await ctx.dataSources.trips.findTrip(tripId)
      if (!trip) throw new GraphQLError("trip doesn't exist")

      // send email
      sendInvite(invitee.email, trip.name)

      let role = TripRole.Author
      switch (invite.role) {
        case TripRole.Editor:
          role = TripRole.Editor
          break
        case TripRole.Viewer:
          role = TripRole.Viewer
          break
      }

      return {
        email: invite.email,
        role: role,
      }
    },
  },
}

export default inviteResolver
