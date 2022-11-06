import typedefs from './place.type.graphql'
import placeResolver from './place.resolver.graphql'

export default {
  resolvers: { ...placeResolver },
  typeDefs: [typedefs],
}
