import typedefs from './spot.type.graphql'
import spotResolver from './spot.resolver.graphql'

export default {
  resolvers: { ...spotResolver },
  typeDefs: [typedefs],
}
