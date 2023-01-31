import { GraphQLError } from 'graphql'
import { Resolvers, Trip } from '../../../generated/graphql'
import { Context } from '../../../types/auth'

const authorsOnTripsResolver: Resolvers = {
  AuthorsOnTrips: {
    trip: async (parent: any, args, ctx: Context): Promise<Trip> => {
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
        authors: {} as any, // let Authors resolver handle
        places: [], // let places resolver handle
      }
    },
  },
}

export default authorsOnTripsResolver
