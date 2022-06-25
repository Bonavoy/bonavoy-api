import { createModule } from 'graphql-modules'

//types and resolvers
import User from './user.type.graphql'
import userResolver from './user.resolver.graphql'

export default createModule({
  id: 'user',
  dirname: __dirname,
  typeDefs: [User],
  resolvers: [userResolver],
})
