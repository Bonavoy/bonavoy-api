import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  # mutations
  type Mutation {
    addSpotToDayPlan(spot: SpotInput): Spot
  }

  #inputs
  input SpotInput {
    fsq_id: String!
    order: Int!
    name: String
    start: DateTime
    end: DateTime
    dayPlanId: ID!
  }

  input SpotRecommendationInputs {
    coords: CoordsInput
    limit: Int
    filter: String
  }

  input CoordsInput {
    lat: Float
    lng: Float
  }

  #types
  type Spot {
    id: ID!
    fsq_id: String!
    name: String!
    order: Int!
    start: DateTime
    end: DateTime
    dayPlanId: ID!
  }

  type ExternalSpot {
    fsq_id: String
    coords: Coords
    name: String!
  }

  type Coords {
    lat: Float
    lng: Float
  }
`
