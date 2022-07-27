import { gql } from 'graphql-modules'

export default gql`
  # queries
  type Query {
    findPlacesByTrip(tripId: ID): [Place]
    getPlaceByDate(tripId: ID, date: DateTime): Place
  }

  # mutations
  type Mutation {
    updateOrder(
      firstPlaceId: String!
      secondPlaceId: String!
      firstNewOrder: Int!
      secondNewOrder: Int!
    ): [PlaceOrder!]!
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
    geometry: [Float]
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
    geometry: [Float]
    colour: String
    dayPlans(date: DateTime): [DayPlan!]
  }

  type PlaceOrder {
    id: String!
    order: Int
  }
`
