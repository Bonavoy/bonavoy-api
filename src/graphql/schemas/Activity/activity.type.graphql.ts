import { gql } from 'graphql-tag'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  # mutations
  type Mutation {
    createActivity(activity: ActivityInput!): Activity!
    updateActivity(id: ID!): Activity!
    deleteActivity(id: ID!): Activity!
  }

  #inputs
  input ActivityInput {
    order: Int!
    name: String!
    start: DateTime
    end: DateTime
    dayPlanId: ID!
  }

  #types
  type Activity {
    id: ID!
    fsq_id: String!
    name: String!
    order: Int!
    start: DateTime
    end: DateTime
    dayPlanId: ID!
  }
`
