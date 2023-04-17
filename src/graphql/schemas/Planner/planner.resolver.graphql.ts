// types
import { Resolvers } from '@bonavoy/generated/graphql'
import { withCancel } from '@bonavoy/graphql/withCancel'
import { plannerPresencePubSub } from '@bonavoy/pubsub/redis'
import { Context } from '@bonavoy/types/auth'
import { GraphQLError } from 'graphql'
import { withFilter } from 'graphql-subscriptions'
import { Redis } from 'ioredis'

export interface AuthorPresentMessage {
  tripId: string
  authorPresent: {
    id: string
    username: string
    firstname: string
    lastname: string
    email: string
    avatar: string
    connected: boolean
  }
}

export const resolvers = {
  Query: {
    authorsPresent: async (_parent: any, { tripId }: any, ctx: Context) => {
      const authorsPresent = await ctx.dataSources.planner.findMany(tripId)
      return authorsPresent.map((authorsPresentMessage) => ({
        id: authorsPresentMessage.authorPresent.id,
        email: authorsPresentMessage.authorPresent.email,
        username: authorsPresentMessage.authorPresent.username,
        firstname: authorsPresentMessage.authorPresent.firstname,
        lastname: authorsPresentMessage.authorPresent.lastname,
        avatar: authorsPresentMessage.authorPresent.avatar,
        connected: authorsPresentMessage.authorPresent.connected,
      }))
    },
  },
  Subscription: {
    listenAuthorPresent: {
      subscribe: async (_parent: any, { tripId }: any, ctx: Context) => {
        const user = await ctx.dataSources.users.findUser({ id: ctx.auth.sub! }) // TODO: check why sub might be null

        if (!user) {
          throw new GraphQLError("User doesn't exist")
        }

        const authorPresentMessage: AuthorPresentMessage = {
          tripId,
          authorPresent: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            email: user.email,
            lastname: user.lastname,
            avatar: user.avatar ? user.avatar : '',
            connected: true,
          },
        }

        // user entered a planning room
        const ok = await ctx.dataSources.planner.set(`${tripId}:${user.id}`, authorPresentMessage)

        if (!ok) throw new GraphQLError('error writing to redis')

        plannerPresencePubSub.publish(`PLANNER_PRESENCE_${tripId}`, authorPresentMessage)

        return withFilter(
          (_parent, { tripId }) => {
            return withCancel(plannerPresencePubSub.asyncIterator(`PLANNER_PRESENCE_${tripId}`), () => {
              // user disconnected from planning room, also fire and forget, not allowed to await here :(
              ctx.dataSources.planner.delete(`${tripId}:${user.id}`)
              authorPresentMessage.authorPresent.connected = false
              plannerPresencePubSub.publish(`PLANNER_PRESENCE_${tripId}`, authorPresentMessage)
            })
          },
          (payload: AuthorPresentMessage, { tripId }, ctx: Context) => {
            // ctx.user is an author,editor or viewer on this tripId
            return !!payload && tripId === payload.tripId
          },
        )(_parent, { tripId }, ctx)
      },
      resolve: (payload: AuthorPresentMessage, _args: any) => {
        return payload.authorPresent
      },
    },
  },
}

export default resolvers
