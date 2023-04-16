import { GraphQLError } from 'graphql'
import { Resolvers, Trip, TripRole } from '@bonavoy/generated/graphql'
import { Context } from '@bonavoy/types/auth'

const authorsOnTripsResolver: Resolvers = {
  Query: {
    authorsOnTrips: async (_parent, { tripId }, ctx: Context) => {
      const authorsOnTrips = await ctx.dataSources.authorsOnTrips.find(tripId)
      return authorsOnTrips.map((authorOnTrip) => {
        let role = TripRole.Author
        switch (authorOnTrip.role) {
          case TripRole.Editor:
            role = TripRole.Editor
          case TripRole.Viewer:
            role = TripRole.Viewer
        }

        return {
          id: authorOnTrip.id,
          role,
          // args for resolved fields
          tripId: authorOnTrip.tripId,
          userId: authorOnTrip.userId,
          // resolved fields
          user: {} as any,
          trip: {} as any,
        }
      })
    },
  },
  AuthorsOnTrips: {
    trip: async (parent: any, _args, ctx: Context): Promise<Trip> => {
      const trip = await ctx.dataSources.trips.findTrip(parent.tripId)

      if (!trip) {
        throw new GraphQLError(`could not find trip with id ${parent.tripId}`)
      }
      return {
        id: trip.id,
        name: trip.name,
        banner: trip.banner,
        endDate: trip.endDate,
        startDate: trip.startDate,
        isPublic: trip.isPublic,
        authors: [], // let Authors resolver handle
        places: [], // let places resolver handle
      }
    },
    user: async (parent: any, _args, ctx: Context) => {
      const user = await ctx.dataSources.users.findUser({ id: parent.userId })
      if (!user) {
        throw new GraphQLError('could not find user')
      }

      return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        verified: user.verified,
        authorsOnTrips: {} as any,
      }
    },
  },
}

export default authorsOnTripsResolver
