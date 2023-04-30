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

export interface ActiveElement {
  active: boolean
  elementId: string
  userId: string
}

export const resolvers: Resolvers = {
  Query: {
    authorsPresent: async (_parent, { tripId }, ctx: Context) => {
      const authorsPresent = await ctx.dataSources.planner.findManyAuthorsPresent(tripId)
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
    activeElements: async (_parent, { tripId }, ctx: Context) => {
      const canAccessTrip = await ctx.accessControl.canAccessTrips(ctx.auth.sub!, [tripId])
      if (!canAccessTrip) throw new GraphQLError('Not allowed to access this trip')
      const activeElements = await ctx.dataSources.planner.findManyActiveElements(tripId)
      return Promise.all(
        activeElements.map(async (item) => {
          if (typeof item !== 'object' || item === null) {
            throw new GraphQLError('malformed active element')
          }
          const activeElement = item as ActiveElement

          // TODO: should move to its own resolver
          const author = await ctx.dataSources.planner.findPresentAuthor(tripId, activeElement.userId)
          if (!author) throw new GraphQLError('could not find author')

          return {
            elementId: activeElement.elementId,
            active: activeElement.active,
            // args for type resolver
            tripId: tripId,
            author: {
              id: author.authorPresent.id,
              username: author.authorPresent.username,
              email: author.authorPresent.email,
              firstname: author.authorPresent.firstname,
              lastname: author.authorPresent.lastname,
              avatar: author.authorPresent.avatar,
              connected: author.authorPresent.connected,
            },
          }
        }),
      )
    },
  },
  Mutation: {
    updateActiveElement: async (_parent, { tripId, activeElement }, ctx: Context) => {
      const canAccessTrip = await ctx.accessControl.canAccessTrips(ctx.auth.sub!, [tripId])
      if (!canAccessTrip) throw new GraphQLError('Not allowed to access this trip')

      if (activeElement.active) {
        // upsert
        const ok = await ctx.dataSources.planner.updateActiveElements(tripId, activeElement)
        if (!ok) throw new GraphQLError('Could not update active element')
      } else {
        // delete
        await ctx.dataSources.planner.deleteActiveElement(tripId, activeElement)
      }
      return true
    },
  },
  Subscription: {
    listenAuthorPresent: {
      subscribe: async (_parent, { tripId }, ctx: Context) => {
        const user = await ctx.dataSources.users.findUser({ id: ctx.auth.sub! }) // TODO: check why sub might be null

        if (!user) throw new GraphQLError("User doesn't exist")

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
        const ok = await ctx.dataSources.planner.setAuthorPresent(tripId, authorPresentMessage)

        if (!ok) throw new GraphQLError('error writing to redis')

        plannerPresencePubSub.publish(`PLANNER_PRESENCE_${tripId}`, authorPresentMessage)

        return withFilter(
          (_parent, { tripId }) => {
            return withCancel(plannerPresencePubSub.asyncIterator(`PLANNER_PRESENCE_${tripId}`), async () => {
              // user disconnected from planning room, also fire and forget, not allowed to await here :(
              await ctx.dataSources.planner.deleteAuthorPresent(`${tripId}:${user.id}`)
              authorPresentMessage.authorPresent.connected = false
              plannerPresencePubSub.publish(`PLANNER_PRESENCE_${tripId}`, authorPresentMessage)
            })
          },
          (payload: AuthorPresentMessage, { tripId }, ctx: Context) => {
            // ctx.user is an author,editor or viewer on this tripId
            return !!payload && tripId === payload.tripId
          },
        )(_parent, { tripId }, ctx) as any
      },
      resolve: (payload: AuthorPresentMessage, _args: any) => {
        return payload.authorPresent
      },
    },
  },
  // ActiveElement: {
  //   author: async (parent, _args, ctx: Context) => {
  //     const author = await ctx.dataSources.planner.findPresentAuthor(parent.author.id, '')
  //     if (!author) throw new GraphQLError('could not find author')
  //     return {
  //       id: author.authorPresent.id,
  //       username: author.authorPresent.username,
  //       email: author.authorPresent.email,
  //       firstname: author.authorPresent.firstname,
  //       lastname: author.authorPresent.lastname,
  //       avatar: author.authorPresent.avatar,
  //       connected: author.authorPresent.connected,
  //     }
  //   },
  // },
}

export default resolvers
