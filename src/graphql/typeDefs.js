import { gql } from 'apollo-server-express';
import { User } from './User';
import { SpotOfInterest } from './SpotOfInterest';
import { Trip } from './Trip';
import { Place } from './Place';
import { DayPlan } from './DayPlan';

const typeDefs = gql`
  ${User.types}
  ${SpotOfInterest.types}
  ${Trip.types}
  ${Place.types}
  ${DayPlan.types}

  type Query {
    ${User.queries}
    ${SpotOfInterest.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${SpotOfInterest.mutations}
    ${Trip.mutations}
  }
`;

export default typeDefs;
