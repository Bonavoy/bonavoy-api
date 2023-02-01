import { gql } from 'graphql-tag'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  # queries
  type Query {
    dayPlans(placeId: ID!): [DayPlan!]!
    dayPlan(id: ID!): DayPlan!
  }

  # mutations
  type Mutation {
    createDayPlan(placeId: ID!, dayPlan: CreateDayPlanInput!): DayPlan!
    updateDayPlan(id: ID!, updateDayPlan: UpdateDayPlanInput!): DayPlan!
    deleteDayPlan(id: ID!): ID!
  }

  # input
  input CreateDayPlanInput {
    order: Int!
    date: DateTime
  }

  input UpdateDayPlanInput {
    date: DateTime
    order: Int
  }

  # types
  type DayPlan {
    id: ID!
    date: DateTime
    order: Int!
    activities: [Activity!]!
  }
`
