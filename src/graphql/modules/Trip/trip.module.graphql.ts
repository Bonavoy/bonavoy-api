import { createModule } from 'graphql-modules'

//types and resolvers
import Trip from './trip.type.graphql'
import tripResolver from './trip.resolver.graphql'

export default createModule({
  id: 'trip',
  dirname: __dirname,
  typeDefs: [Trip],
  resolvers: [tripResolver],
})
