import { createModule } from 'graphql-modules'

//types and resolvers
import Spot from './spot.type.graphql'
import spotResolver from './spot.resolver.graphql'

export default createModule({
  id: 'spot',
  dirname: __dirname,
  typeDefs: [Spot],
  resolvers: [spotResolver],
})
