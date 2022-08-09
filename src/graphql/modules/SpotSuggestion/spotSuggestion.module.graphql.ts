import { createModule } from 'graphql-modules'

//types and resolvers
import SpotSuggestion from './spotSuggestion.type.graphql'
import spotSuggestionResolver from './spotSuggestion.resolver.graphql'

export default createModule({
  id: 'spotSuggestion',
  dirname: __dirname,
  typeDefs: [SpotSuggestion],
  resolvers: [spotSuggestionResolver],
})
