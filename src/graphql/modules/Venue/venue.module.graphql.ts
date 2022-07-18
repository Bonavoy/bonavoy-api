import { createModule } from 'graphql-modules'

//types and resolvers
import Venue from './venue.type.graphql'
import venueResolver from './venue.resolver.graphql'

export default createModule({
  id: 'venue',
  dirname: __dirname,
  typeDefs: [Venue],
  resolvers: [venueResolver],
})
