//types
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'
import { VenueRecommendationParams } from '../../datasources/api/foursquare'

interface Coords {
  lat: number
  lng: number
}

interface Venue {
  fsq_id: string
  name: string
  coords: Coords
}

export default {
  Query: {
    venue: async (
      _: unknown,
      args: { input: VenueRecommendationParams },
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
        pageSize: input.pageSize ?? 16,
        offset: input.offset,
      }
      const spotRecommendations = await dataSources.foursquareAPI.getVenueRecommendations(options)
      return spotRecommendations
    },
  },
}
