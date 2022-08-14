import { gql } from 'graphql-modules'

export default gql`
  # queries
  type Query {
    findPlacesByTrip(tripId: ID): [Place]
    getPlaceByDate(tripId: ID, date: DateTime): Place
  }

  # mutations
  type Mutation {
    createPlace(place: PlaceInput!, tripId: ID!): Place!
    updatePlacesOrder(
      firstPlaceId: String!
      secondPlaceId: String!
      firstNewOrder: Int!
      secondNewOrder: Int!
    ): [PlaceOrder!]!
    deletePlace(placeId: ID!): ID!
    updatePlaceDates(placeId: ID!, startDate: DateTime!, endDate: DateTime!): PlaceDates!
  }

  #inputs
  input PlaceInput {
    text: String!
    place_name: String!
    mapbox_id: String!
    startDate: DateTime
    endDate: DateTime
    order: Int!
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
    startDate: DateTime!
    endDate: DateTime!
    order: Int!
    colour: String!
    country: String!
    center: [Float]!
    dayPlans(date: DateTime): [DayPlan!]
  }

  type PlaceOrder {
    id: String!
    order: Int
  }

  type PlaceDates {
    startDate: DateTime!
    endDate: DateTime!
  }
`
