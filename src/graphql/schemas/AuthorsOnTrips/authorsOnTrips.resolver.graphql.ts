import { GraphQLError } from 'graphql'
import { Resolvers, Trip } from '@bonavoy/generated/graphql'
import { Context } from '@bonavoy/types/auth'

const authorsOnTripsResolver: Resolvers = {
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
