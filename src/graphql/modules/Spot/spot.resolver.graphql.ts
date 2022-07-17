//types
import { Spot } from '@prisma/client'
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'

// TODO: WRITE TYPES
export default {
  Mutation: {
    addSpotToDayPlan: async (
      _: unknown,
      args: {
        spot: Spot
      },
      { dataSources }: { dataSources: BonavoyDataSources },
    ) => {
      const { spot } = args
      console.log(spot)
      // const order = dataSources.spots.findHighestOrderSpot(spot.dayPlanId)
      return await dataSources.spots.addSpotToDayPlan(spot)
    },
  },
}
