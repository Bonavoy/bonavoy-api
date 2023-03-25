import typedefs from './transportation.type.graphql'
import transportationResolver from './transportation.resolver.graphql'

export default {
  resolvers: { ...transportationResolver },
  typeDefs: [typedefs],
}
