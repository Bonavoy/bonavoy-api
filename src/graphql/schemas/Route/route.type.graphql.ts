import { gql } from 'graphql-tag'

export default gql`
  # queries
  type Query {
    # explanation of float array array array thing:
    # A leg describes the points between the starting and arrival locations in a route
    # We separate the routes so we can make multiple disconnected routes with GeoJson MultilineString
    # [
    #   [ # leg 1 for location A -> location B
    #     [11.1, 12.1], # points on this leg
    #     [11.1, 12.1],
    #     [11.1, 12.1],
    #     [11.1, 12.1],
    #     [11.1, 12.1],
    #   ],
    #   [ # leg 2 for location E -> location F
    #     [11.1, 12.1], # points on this leg
    #     [11.1, 12.1],
    #     [11.1, 12.1],
    #   ],
    # ]
    routeLegs(routeWaypoints: [[InputCoords!]!]!): [RouteLeg!]!
  }

  type RouteLeg {
    segments: [[Float!]!]!
    duration: Float!
  }
`
