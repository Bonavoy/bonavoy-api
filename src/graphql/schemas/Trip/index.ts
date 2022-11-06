import typedefs from './trip.type.graphql'
import tripResolver from './trip.resolver.graphql'

export default {
  resolvers: { ...tripResolver },
  typeDefs: [typedefs],
}
