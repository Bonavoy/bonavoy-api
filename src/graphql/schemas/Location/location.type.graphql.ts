import { gql } from 'graphql-tag'

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
    center: [Float]!
    id: ID!
    place_name: String!
    text: String!
    context: [LocationContext]!
  }

  type LocationContext {
    id: String!
    short_code: String
    wikidata: String
    text: String!
  }
`