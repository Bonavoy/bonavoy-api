import { gql } from 'graphql-tag'

export default gql`
  #queries
  type Query {
    getLocationSuggestions(
      query: String! # types: [String!]! # country: [String!]!
    ): # proximity: [String!]!
    [LocationSuggestion!]!
  }

  # mutations
  # type Mutation {}

  #types
  type LocationSuggestion {
    name: String!
    text: String!
    center: Coords!
    # context: [LocationContext!]!
  }

  type LocationContext {
    id: String!
    short_code: String
    wikidata: String
    text: String!
  }
`
