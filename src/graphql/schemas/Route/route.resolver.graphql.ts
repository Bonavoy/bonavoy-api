// types
import { Context } from '@bonavoy/types/auth'
import { Resolvers } from '@bonavoy/generated/graphql'
import { GraphQLError } from 'graphql'

// TODO: WRITE TYPES
export const resolvers: Resolvers = {
  Query: {
    routeSegments: async (_parent, { segmentWaypoints }, ctx: Context) => {
      const routeSegmentPromises = segmentWaypoints.map((waypoint) => ctx.dataSources.mapboxAPI.getRoute(waypoint))
      const routeSegmentResults = await Promise.all(routeSegmentPromises)
      return routeSegmentResults.map((routeSegment) => {
        if (routeSegment.code === 'NoRoute' || routeSegment.code === 'NoSegment' || routeSegment.routes.length === 0) {
          return []
        }
        return routeSegment.routes[0].geometry.coordinates
      })
    },
  },
}

export default resolvers
