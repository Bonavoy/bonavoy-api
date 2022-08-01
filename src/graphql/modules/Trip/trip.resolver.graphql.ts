import { Place, Trip } from '@prisma/client'
import { AuthenticationError } from 'apollo-server-express'

//types
import { Context } from '../../../types/auth'

export default {
  Query: {
    getTrip: async (_: unknown, { tripId }: { tripId: string }, ctx: Context) => {
      return await ctx.dataSources.trips.findTrip(tripId)
    },
    trips: async (_: unknown, __: null, ctx: Context) => {
      const userId = ctx.auth.sub
      return await ctx.dataSources.trips.findManyTrips(userId!)
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
