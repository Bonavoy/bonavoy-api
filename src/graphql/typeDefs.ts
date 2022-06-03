import { gql } from 'apollo-server-express';

import { User } from './User';
import { Location } from './Location';
import { SpotOfInterest } from './SpotOfInterest';
import { Trip } from './Trip';
import { Place } from './Place';
import { DayPlan } from './DayPlan';

const typeDefs = gql`
  ${User.types}
  ${Location.types}
  ${SpotOfInterest.types}
  ${Trip.types}
  ${Place.types}
  ${DayPlan.types}
  
  type Query {
    ${User.queries}
    ${Location.queries}
    ${SpotOfInterest.queries}
  }

  type Mutation {
    ${User.mutations}
    ${Location.mutations}
    ${SpotOfInterest.mutations}
    ${Trip.mutations}
  }
`;

export default typeDefs;
