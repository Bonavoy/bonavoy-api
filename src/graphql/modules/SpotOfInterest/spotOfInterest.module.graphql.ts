import { createModule } from 'graphql-modules';

//types and resolvers
import SpotOfInterest from './spotOfInterest.type.graphql';
import spotOfInterestResolver from './spotOfInterest.resolver.graphql';

export default createModule({
  id: 'spotOfInterest',
  dirname: __dirname,
  typeDefs: [SpotOfInterest],
  resolvers: [spotOfInterestResolver],
});
