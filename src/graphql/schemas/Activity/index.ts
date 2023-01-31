import typedefs from './activity.type.graphql'
import activityResolver from './activity.resolver.graphql'

export default {
  resolvers: { ...activityResolver },
  typeDefs: [typedefs],
}
