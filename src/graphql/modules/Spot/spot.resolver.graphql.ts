//types
import { Spot } from '@prisma/client'
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'

// TODO: WRITE TYPES
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
}
