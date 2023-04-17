import typedefs from './planner.type.graphql'
import plannerResolver from './planner.resolver.graphql'

export default {
  resolvers: { ...plannerResolver },
  typeDefs: [typedefs],
}
