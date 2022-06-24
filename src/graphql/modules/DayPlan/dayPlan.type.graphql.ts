import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  # queries
  type Query {
    getDayPlanByDate(placeId: ID, date: String): DayPlan
  }

  # mutations
  type Mutation {
    createDayPlan(dayPlan: CreateDayPlanInput): DayPlan
  }

  # input
  input CreateDayPlanInput {
    date: String
    order: Int
    placeId: ID
  }

  # types
  type DayPlan {
    id: ID
    date: String
    order: Int
    placeId: ID
  }
`
