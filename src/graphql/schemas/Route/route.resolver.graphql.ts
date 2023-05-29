// types
import { Context } from '@bonavoy/types/auth'
import { Resolvers } from '@bonavoy/generated/graphql'

// TODO: WRITE TYPES
export const resolvers: Resolvers = {
  Query: {
    routeLegs: async (_parent, { routeWaypoints }, ctx: Context) => {
      const routeSegmentPromises = routeWaypoints.map((waypoint) => ctx.dataSources.mapboxAPI.getRoute(waypoint))
      const routeSegmentResults = await Promise.all(routeSegmentPromises)
      return routeSegmentResults.map((routeSegment) => {
        if (routeSegment.code === 'NoRoute' || routeSegment.code === 'NoSegment' || routeSegment.routes.length === 0) {
          return {
            segments: [],
            duration: 0,
          }
        }
        return {
          segments: routeSegment.routes[0].geometry.coordinates,
          duration: routeSegment.routes[0].duration,
        }
      })
    },
  },
}

export default resolvers
