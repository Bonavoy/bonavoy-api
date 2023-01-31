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
    updatePlace(place: UpdatePlaceInput!): Place!
  }

  #inputs
  input PlaceInput {
    text: String!
    place_name: String!
    mapbox_id: String!
    startDate: DateTime
    endDate: DateTime
    colour: String!
    country: String!
    center: [Float!]!
  }

  input UpdatePlaceInput {
    text: String
    place_name: String
    mapbox_id: String
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
    place_name: String!
    mapbox_id: String!
    startDate: DateTime
    endDate: DateTime
    colour: String!
    country: String!
    center: [Float!]!
    dayPlans(date: DateTime): [DayPlan!]
  }

  type PlaceDates {
    startDate: DateTime!
    endDate: DateTime!
  }
`
