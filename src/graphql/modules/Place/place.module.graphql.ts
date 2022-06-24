import { createModule } from 'graphql-modules'

//types and resolvers
import Place from './place.type.graphql'
import PlaceResolver from './place.resolver.graphql'

export default createModule({
  id: 'place',
  dirname: __dirname,
  typeDefs: [Place],
  resolvers: [PlaceResolver],
})
