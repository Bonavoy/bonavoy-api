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
    updateOrder(
      firstPlaceId: String!
      secondPlaceId: String!
      firstNewOrder: Int!
      secondNewOrder: Int!
    ): [PlaceOrder!]!
    deletePlace(placeId: ID!): Boolean!
    updatePlaceDates(placeId: ID!, startDate: String!, endDate: String!): PlaceDates!
  }

  #inputs
  input PlaceInput {
    id: ID
    text: String!
    place_name: String!
    mapbox_id: String!
    startDate: DateTime
    endDate: DateTime
    order: Int!
    bbox: [Float]
    center: [Float]
    colour: String
    # dayPlans: [CreateDayPlanInput]
  }

  # types
  type Place {
    id: ID!
    text: String!
    place_name: String!
    mapbox_id: String!
    startDate: DateTime
    endDate: DateTime
    order: Int!
    bbox: [Float]
    center: [Float]
    colour: String
    dayPlans(date: DateTime): [DayPlan!]
  }

  type PlaceOrder {
    id: String!
    order: Int
  }

  type PlaceDates {
    placeId: ID!
    startDate: String!
    endDate: String!
  }
`
