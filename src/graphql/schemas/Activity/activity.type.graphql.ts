import { gql } from 'graphql-tag'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  # mutations
  type Mutation {
    createActivity(dayPlanId: ID!, activity: ActivityInput!): Activity!
    updateActivity(id: ID!, updateActivityInput: UpdateActivityInput!): Activity!
    deleteActivity(id: ID!): ID!
  }

  #inputs
  input ActivityInput {
    order: Int!
    name: String!
    start: DateTime
    end: DateTime
  }

  input UpdateActivityInput {
    name: String
    order: Int
    start: DateTime
    end: DateTime
  }

  #types
  type Activity {
    id: ID!
    name: String!
    order: Int!
    start: DateTime
    end: DateTime
  }
`
