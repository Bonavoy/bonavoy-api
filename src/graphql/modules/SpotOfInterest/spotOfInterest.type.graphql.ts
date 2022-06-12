import { gql } from 'graphql-modules';

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    getSpotOfInterestRecommendations(
      input: SpotOfInterestRecommendationsInputs
    ): [SpotOfInterest]
  }

  #mutations
  type Mutation {
    addSpotOfInterest(input: SpotOfInterestInput): [SpotOfInterest]
  }

  #inputs
  input SpotOfInterestInput {
    fsq_id: String!
    from: String
    to: String
  }

  input SpotOfInterestRecommendationsInputs {
    coords: CoordsInput
    limit: Int
    filter: String
  }

  input CoordsInput {
    lat: Float
    lng: Float
  }

  #types
  type SpotOfInterest {
    fsq_id: ID
    name: String
    distance: Int
    coords: Coords
  }

  type Coords {
    lat: Float
    lng: Float
  }
`;
