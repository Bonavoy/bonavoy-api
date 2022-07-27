// types
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'

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
    findPlacesByTrip: async (
      _: unknown,
      args: { tripId: string },
      { dataSources }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      const { tripId } = args
      return await dataSources.places.findPlacesByTrip(tripId)
    },
    getPlaceByDate: async (
      _: unknown,
      args: { tripId: string; date: Date },
      { dataSources }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      const { tripId, date } = args
      const place = await dataSources.places.findPlaceByDate(tripId, date)
      return place
    },
  },
}
