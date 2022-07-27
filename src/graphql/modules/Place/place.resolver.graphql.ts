// types
import { Place } from '@prisma/client'
import { Context } from '../../../types/auth'

// TODO: WRITE TYPES
export default {
  Place: {
    dayPlans: async (places: any, args: { date: Date }) => {
      const { date } = args
      let dayPlanArr = places.dayPlans
      if (date) {
        dayPlanArr = places.dayPlans.filter((dayPlan: any) => {
          return new Date(dayPlan.date).getTime() === date.getTime()
        })
      }
      return dayPlanArr
    },
  },
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
  },
}
