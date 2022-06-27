import { createModule } from 'graphql-modules'

//types and resolvers
import DateTime from './dateTime.type.graphql'
import DateTimeResolver from './dateTime.resolver.graphql'

export default createModule({
  id: 'dateTime',
  dirname: __dirname,
  typeDefs: [DateTime],
  resolvers: [DateTimeResolver],
})
