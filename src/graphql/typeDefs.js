import { gql } from 'apollo-server-express';
import { User } from './User';
import { SpotOfInterest } from './SpotOfInterest';

const typeDefs = gql`
  ${User.types}
  ${SpotOfInterest.types}

  type Query {
    ${User.queries}
    ${SpotOfInterest.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${SpotOfInterest.mutations}
  }
`;

export default typeDefs;
