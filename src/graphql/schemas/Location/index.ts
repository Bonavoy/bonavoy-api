import typedefs from './location.type.graphql'
import locationResolver from './location.resolver.graphql'

export default {
  resolvers: { ...locationResolver },
  typeDefs: [typedefs],
}
