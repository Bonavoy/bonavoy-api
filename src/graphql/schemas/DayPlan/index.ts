import typedefs from './dayPlan.type.graphql'
import dayPlanResolver from './dayPlan.resolver.graphql'

export default {
  resolvers: { ...dayPlanResolver },
  typeDefs: [typedefs],
}
