//types
import { Context } from '../../../types/auth'

export interface Coords {
  lat: number
  lng: number
}

export interface SpotSuggestionsInput {
  coords: Coords
  pageSize: number
  filters?: string[]
  cursor?: string
}

export interface SearchSpotsInput {
  query: string
  coords: Coords
  limit: number
}

export default {
  Query: {
    searchSpots: async (_: unknown, args: { input: SearchSpotsInput }, ctx: Context) => {
      const { input } = args
      const spotSearchResult = await ctx.dataSources.foursquareAPI.searchSpots(input)
      return spotSearchResult
    },
    spotSuggestionPage: async (_: unknown, args: { input: SpotSuggestionsInput }, ctx: Context) => {
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
