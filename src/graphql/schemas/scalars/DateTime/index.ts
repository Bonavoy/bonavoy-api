//types and resolvers
import typedefs from './dateTime.type.graphql'
import DateTimeResolver from './dateTime.resolver.graphql'

export default {
  resolvers: DateTimeResolver,
  typeDefs: [typedefs],
}
