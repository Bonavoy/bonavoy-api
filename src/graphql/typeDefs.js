import { gql } from 'apollo-server-express';
import { User } from './User';
import { Location } from './Location';

const typeDefs = gql`
  ${User.types}
  ${Location.types}
  
  type Query {
    ${User.queries}
    ${Location.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${Location.mutations}
  }
`;

export default typeDefs;
