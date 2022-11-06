import typedefs from './spotSuggestion.type.graphql'
import spotSuggestionResolver from './spotSuggestion.resolver.graphql'

export default {
  resolvers: { ...spotSuggestionResolver },
  typeDefs: [typedefs],
}
