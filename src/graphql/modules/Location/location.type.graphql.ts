import { gql } from 'graphql-modules';

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

  #inputs

  #types
  type LocationSuggestion {
    bbox: [Float]
    center: [Float]
    id: ID!
    place_name: String!
    place_type: [String]!
    relevance: Int!
    text: String!
    type: String!
  }
`;
