import { Place, Trip } from '@prisma/client'

//types
import { Context } from '../../../types/auth'

export default {
  Query: {
    getTrip: async (_: unknown, { tripId }: { tripId: string }, ctx: Context) => {
      return await ctx.dataSources.trips.findTrip(tripId)
    },
  },
  Mutation: {
    createTrip: async (_: unknown, { trip }: { trip: Trip & { places: Place[] } }, ctx: Context) => {
      return ctx.dataSources.trips.createTrip(trip)
    },
    updateTripName: async (_: unknown, { tripId, name }: { tripId: string; name: string }, ctx: Context) => {
      return ctx.dataSources.trips.updateTripName(tripId, name)
    },
  },
}
