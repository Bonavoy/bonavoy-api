import { gql } from 'graphql-modules'

export default gql`
  #queries
  type Query {
    getLocationSuggestions(
      query: String!
      types: [String]!
      country: [String]!
      proximity: [String]!
    ): [LocationSuggestion!]!
  }

  #mutations
  # type Mutation {}

  #types
  type LocationSuggestion {
    bbox: [Float]
    center: [Float]
    geometry: Geometry!
    id: ID!
    place_name: String!
    place_type: [String]!
    relevance: Int!
    text: String!
    type: String!
  }

  type Geometry {
    type: String!
    coordinates: [Float]!
  }
`
