//types
import { Context } from '../../../types/auth'
import { SpotSuggestionParams } from '../../datasources/api/foursquare'

export default {
  Query: {
    spotSuggestionPage: async (_: unknown, args: { input: SpotSuggestionParams }, ctx: Context) => {
      //WRITE TYPES
      const { input } = args
      const options = {
        coords: input.coords,
        pageSize: input.pageSize ?? 16,
        filters: input.filters ?? [],
        ...(input.cursor && { cursor: input.cursor }),
      }
      const spotSuggestions = await ctx.dataSources.foursquareAPI.getSpotSuggestions(options)
      return spotSuggestions
    },
  },
}
