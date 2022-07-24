import { Spot } from '@prisma/client'
import { differenceInDays, subDays } from 'date-fns'

//types
import { Context } from '../../../types/auth'

// TODO: query and interpolate names of Foursquare places into Spot data so we don't get sued OMEGALUL
export default {
  Mutation: {
    spot: async (
      _: unknown,
      args: {
        spot: Spot
        date: Date
        tripId: string
        placeId: string
      },
      ctx: Context,
    ) => {
      const { spot, date, tripId, placeId } = args
      // create day plan if no day plan id was
      if (!spot.dayPlanId) {
        const places = await ctx.dataSources.places.findPlacesByTrip(tripId)
        const firstDate = new Date(places[0].startDate as Date)
        const order = differenceInDays(date, firstDate) + 1
        const dayPlan = await ctx.dataSources.dayPlans.createDayPlan({ placeId, order, date })

        spot.dayPlanId = dayPlan!.id
        spot.order = 1
      }
      return await ctx.dataSources.spots.addSpotToDayPlan(spot)
    },
  },
}
