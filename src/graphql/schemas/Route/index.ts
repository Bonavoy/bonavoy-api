import typedefs from './route.type.graphql'
import routeResolver from './route.resolver.graphql'

export default {
  resolvers: { ...routeResolver },
  typeDefs: [typedefs],
}
