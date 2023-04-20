import crypto from 'crypto'

import { Resolvers } from '@bonavoy/generated/graphql'
import { Context } from '@bonavoy/types/auth'

const inviteResolver: Resolvers = {
  Query: {
    invites: (_parent, { tripId }, ctx: Context) => {
      return []
    },
  },
  Mutation: {
    sendInvite: async (_parent, { tripId, invitee }, ctx: Context) => {
      var code = crypto.randomBytes(64).toString('hex')
      await ctx.dataSources.invite.create({
        tripId,
        email: invitee.email,
        role: invitee.role,
        code,
      })

      // send email

      return true
    },
  },
}

export default inviteResolver
