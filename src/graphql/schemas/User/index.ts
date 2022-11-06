// types and resolvers
import typedefs from './user.type.graphql'
import userResolver from './user.resolver.graphql'

export default {
  resolvers: { ...userResolver },
  typeDefs: [typedefs],
}
