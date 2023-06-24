import { gql } from 'graphql-tag'

export default gql`
  #queries
  type Query {
    getLocationSuggestions(
      query: String! # types: [String!]! # country: [String!]! # proximity: [String!]!
    ): [LocationSuggestion!]!
  }

  #types
  type LocationSuggestion {
    name: String!
    text: String!
    center: Coords!
    country: Country!
  }

  type Country {
    shortCode: String!
    text: String!
  }
`
