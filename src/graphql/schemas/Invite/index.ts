import typedefs from './invite.schema.graphql'
import inviteResolver from './invite.resolver.graphql'

export default {
  resolvers: { ...inviteResolver },
  typeDefs: [typedefs],
}
