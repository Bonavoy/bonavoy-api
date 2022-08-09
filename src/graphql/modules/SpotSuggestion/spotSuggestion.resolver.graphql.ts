//types
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'
import { SpotSuggestionParams } from '../../datasources/api/foursquare'

export default {
  Query: {
    spotSuggestionPage: async (
      _: unknown,
      args: { input: SpotSuggestionParams },
      { dataSources }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      //WRITE TYPES
      const { input } = args
      const options = {
        coords: input.coords,
        pageSize: input.pageSize ?? 16,
        ...(input.cursor && { cursor: input.cursor }),
      }
      const spotSuggestions = await dataSources.foursquareAPI.getSpotSuggestions(options)
      return spotSuggestions
    },
  },
}
