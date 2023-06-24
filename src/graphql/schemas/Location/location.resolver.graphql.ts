import { Resolvers } from '@bonavoy/generated/graphql'
import { Context } from '@bonavoy/types/auth'

interface LocationSuggestion {
  place_name: string
  text: string
  center: number[]
  context: { id: string; shortcode: string; text: string }[]
}

const locationResolver: Resolvers = {
  Query: {
    getLocationSuggestions: async (_parent, { query }, ctx: Context) => {
      const locationSuggestions = await ctx.dataSources.mapboxAPI.getLocationSuggestions(query)
      const parsedLocations = locationSuggestions.map((location: LocationSuggestion) => {
        const country = location.context.find((obj) => obj.id.includes('country'))

        if (!country) return null

        return {
          name: location.place_name,
          text: location.text,
          center: {
            lng: location.center[0],
            lat: location.center[1],
          },
          country: {
            shortcode: country?.shortcode,
            text: country?.text,
          },
        }
      })
      return parsedLocations.filter((location: LocationSuggestion) => !!location)
    },
  },
}

export default locationResolver
