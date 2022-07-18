import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    venue(input: VenueRecommendationInputs): [Venue]
  }

  # inputs
  input VenueRecommendationInputs {
    coords: CoordsInput!
    pageSize: Int
    offset: Int
  }

  input CoordsInput {
    lat: Float
    lng: Float
  }

  # types
  type Venue {
    fsq_id: String!
    coords: Coords!
    name: String!
    category: String
  }

  type Coords {
    lat: Float
    lng: Float
  }
`
