import { gql } from 'graphql-tag'

export default gql`
  # queries
  type Query {
    places(tripId: ID!): [Place!]!
    place(id: ID!): Place!
  }

  # mutations
  type Mutation {
    createPlace(tripId: ID!, place: PlaceInput!): Place!
    deletePlace(placeId: ID!): ID!
    updatePlace(id: ID!, place: UpdatePlaceInput!): Place!
  }

  #inputs
  input PlaceInput {
    text: String!
    placeName: String!
    mapboxId: String!
    startDate: DateTime
    endDate: DateTime
    colour: String!
    country: String!
    center: [Float!]!
  }

  input UpdatePlaceInput {
    text: String
    placeName: String
    mapboxId: String
    startDate: DateTime
    endDate: DateTime
    colour: String
    country: String
    center: [Float!]
  }

  # types
  type Place {
    id: ID!
    text: String!
    placeName: String!
    mapboxId: String!
    startDate: DateTime
    endDate: DateTime
    colour: String!
    country: String!
    center: [Float!]!
    dayPlans: [DayPlan!]!
    transportation: [[Transportation!]!]!
  }
`
