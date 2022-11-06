import { gql } from 'graphql-tag'

export default gql`
  # queries
  type Query {
    findPlacesByTrip(tripId: ID): [Place]
    getPlaceByDate(tripId: ID, date: DateTime): Place
  }

  # mutations
  type Mutation {
    createPlace(place: PlaceInput!, tripId: ID!): Place!
    deletePlace(placeId: ID!): ID!
    updatePlaceDates(placeId: ID!, startDate: DateTime!, endDate: DateTime!): PlaceDates!
  }

  #inputs
  input PlaceInput {
    id: ID
    text: String!
    place_name: String!
    mapbox_id: String!
    startDate: DateTime
    endDate: DateTime
    colour: String!
    country: String!
    center: [Float]!
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
    center: [Float]!
    dayPlans(date: DateTime): [DayPlan!]
  }

  type PlaceDates {
    startDate: DateTime!
    endDate: DateTime!
  }
`
