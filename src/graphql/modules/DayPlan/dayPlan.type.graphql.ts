import { gql } from 'graphql-modules';

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  # queries
  type Query {
    getDayPlan(dayPlanId: String): DayPlan
  }

  # mutations
  type Mutation {
    appendSpotOfInterest(
      dayPlanId: String
      spotOfInterest: SpotOfInterestInput
    ): [SpotOfInterest]
  }

  # types
  type DayPlan {
    id: ID
    date: String
    spotsOfInterest: [SpotOfInterest]
  }
`;
