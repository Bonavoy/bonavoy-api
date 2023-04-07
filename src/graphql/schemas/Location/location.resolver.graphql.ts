import { Resolvers } from '@bonavoy/generated/graphql'
import { Context } from '@bonavoy/types/auth'

interface LocationSuggestion {
  place_name: string
  text: string
  center: number[]
}

const locationResolver: Resolvers = {
  Query: {
    getLocationSuggestions: async (_parent, { query }, ctx: Context) => {
      const locationSuggestions = await ctx.dataSources.mapboxAPI.getLocationSuggestions(query)
      const parsedLocations = locationSuggestions.map((location: LocationSuggestion) => ({
        name: location.place_name,
        text: location.text,
        center: {
          lng: location.center[0],
          lat: location.center[1],
        },
      }))
      return parsedLocations
    },
  },
}

export default locationResolver
