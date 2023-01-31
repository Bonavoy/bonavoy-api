// types and resolvers
import typedefs from './authorsOnTrips.schema.graphql'
import authorsOnTripsResolver from './authorsOnTrips.resolver.graphql'

export default {
  resolvers: { ...authorsOnTripsResolver },
  typeDefs: [typedefs],
}
