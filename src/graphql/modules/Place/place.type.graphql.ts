import { gql } from 'graphql-modules'

export default gql`
  # queries
  type Query {
    findPlacesByTrip(tripId: ID): [Place]
    getPlaceByDate(tripId: ID, date: DateTime): Place
  }

  #inputs
  input PlaceInput {
    name: String!
    mapbox_id: String!
    start: DateTime
    end: DateTime
    order: Int!
    bbox: [Float]
    center: [Float]
    geometry: [Float]
  }

  # types
  type Place {
    id: ID!
    name: String!
    mapbox_id: String!
    start: DateTime
    end: DateTime
    order: Int!
    center: [Float]
    dayPlans(date: DateTime): [DayPlan!]
  }
`
