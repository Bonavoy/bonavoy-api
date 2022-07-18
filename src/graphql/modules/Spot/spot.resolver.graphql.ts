//types
import { Spot } from '@prisma/client'
import { differenceInDays, subDays } from 'date-fns'

import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'

// TODO: query and interpolate names of Foursquare places into Spot data so we don't get sued OMEGALUL
export default {
  Query: {
    getSpotRecommendations: async (
      _: unknown,
      args: { input: { coords: { lat: number; lng: number }; limit: number } },
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      //WRITE TYPES
      const { input } = args
      const options = {
        coords: input.coords,
        limit: input.limit,
      }
      const spotRecommendations = await dataSources.foursquareAPI.getSpots(options)
      return spotRecommendations
    },
  },
  Mutation: {
    spot: async (
      _: unknown,
      args: {
        spot: Spot
        date: Date
        tripId: string
        placeId: string
      },
      { dataSources }: { dataSources: BonavoyDataSources },
    ) => {
      const { spot, date, tripId, placeId } = args
      // create day plan if no day plan id was
      if (!spot.dayPlanId) {
        const places = await dataSources.places.findPlacesByTrip(tripId)
        const firstDate = new Date(places[0].start)
        const order = differenceInDays(date, firstDate) + 1
        const dayPlan = await dataSources.dayPlans.createDayPlan({ placeId, order, date })

        spot.dayPlanId = dayPlan!.id
        spot.order = 1
      }
      return await dataSources.spots.addSpotToDayPlan(spot)
    },
  },
}
