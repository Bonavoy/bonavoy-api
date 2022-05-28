import { gql } from 'apollo-server-express';
import { Location } from './Location';
import { SpotOfInterest } from './SpotOfInterest';
import { Trip } from './Trip';
import { Place } from './Place';
import { DayPlan } from './DayPlan';

const typeDefs = gql`
  ${Location.types}
  ${SpotOfInterest.types}
  ${Trip.types}
  ${Place.types}
  ${DayPlan.types}
  
  type Query {
    ${Location.queries}
    ${SpotOfInterest.queries}
  }

  type Mutation {
    ${Location.mutations}
    ${SpotOfInterest.mutations}
    ${Trip.mutations}
  }
`;

export default typeDefs;
