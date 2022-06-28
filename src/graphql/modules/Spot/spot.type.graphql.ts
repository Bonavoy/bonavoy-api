import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    getSpotRecommendations(input: SpotRecommendationInputs): [ExternalSpot]
  }

  #inputs
  input SpotInput {
    fsq_id: String!
    from: DateTime
    to: DateTime
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
    fsq_id: String
    # coords: Coords
    name: String!
    order: Int!
    start: DateTime
    end: DateTime
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
