import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    venuePage(input: VenueRecommendationInputs): VenuePage
  }

  # inputs
  input VenueRecommendationInputs {
    coords: CoordsInput!
    pageSize: Int!
    cursor: String
  }

  input CoordsInput {
    lat: Float!
    lng: Float!
  }

  # types
  type Venue {
    fsq_id: String!
    coords: Coords!
    name: String!
    category: String
  }

  type VenuePage {
    venues: [Venue]
    cursor: String
  }

  type Coords {
    lat: Float
    lng: Float
  }
`
