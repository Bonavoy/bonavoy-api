// types
import { Place } from '@prisma/client'
import { Context } from '../../../types/auth'

// TODO: WRITE TYPES
export default {
  Query: {
    findPlacesByTrip: async (_: unknown, args: { tripId: string }, ctx: Context) => {
      const { tripId } = args
      return await ctx.dataSources.places.findPlacesByTrip(tripId)
    },
    getPlaceByDate: async (_: unknown, args: { tripId: string; date: Date }, ctx: Context) => {
      const { tripId, date } = args
      return await ctx.dataSources.places.findPlaceByDate(tripId, date)
    },
  },
  Mutation: {
    createPlace: async (_: unknown, { place, tripId }: { place: Place; tripId: string }, ctx: Context) => {
      return await ctx.dataSources.places.createPlace(place, tripId)
    },
    updateOrder: async (
      _: unknown,
      args: { firstPlaceId: string; secondPlaceId: string; firstNewOrder: number; secondNewOrder: number },
      ctx: Context,
    ) => {
      return await ctx.dataSources.places.updatePlaceOrder(
        args.firstPlaceId,
        args.secondPlaceId,
        args.firstNewOrder,
        args.secondNewOrder,
      )
    },
    deletePlace: async (_: unknown, { placeId }: { placeId: string }, ctx: Context) => {
      return !!(await ctx.dataSources.places.deletePlace(placeId))
    },
    updatePlaceDates: async (
      _: unknown,
      { placeId, startDate, endDate }: { placeId: string; startDate: Date; endDate: Date },
      ctx: Context,
    ) => {
      return await ctx.dataSources.places.updatePlaceDates(placeId, startDate, endDate)
    },
  },
}
