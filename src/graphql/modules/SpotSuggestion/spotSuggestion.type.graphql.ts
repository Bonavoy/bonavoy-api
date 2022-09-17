import { gql } from 'graphql-modules'

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    spotSuggestionPage(input: SpotSuggestionInputs): spotSuggestionPage
    searchSpots(input: SearchSpotsInput): [SpotSuggestion]
  }

  # inputs
  input SpotSuggestionInputs {
    coords: CoordsInput!
    pageSize: Int!
    cursor: String
    filters: [String]
  }

  input SearchSpotsInput {
    query: String
    coords: CoordsInput
    limit: Int
  }

  input CoordsInput {
    lat: Float!
    lng: Float!
  }

  # types
  type SpotSuggestion {
    fsq_id: String!
    coords: Coords!
    name: String!
    category: String
    prefix: String
    suffix: String
  }

  type spotSuggestionPage {
    spotSuggestions: [SpotSuggestion]
    cursor: String
  }

  type Coords {
    lat: Float
    lng: Float
  }
`
