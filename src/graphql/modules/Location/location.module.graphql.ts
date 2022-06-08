import { createModule } from 'graphql-modules';

//types and resolvers
import Location from './location.type.graphql';
import locationResolver from './location.resolver.graphql';

export default createModule({
  id: 'location',
  dirname: __dirname,
  typeDefs: [Location],
  resolvers: [locationResolver],
});
