import { gql } from 'graphql-modules'

export default gql`
  # queries
  type Query {
    findPlacesByTrip(tripId: ID): [Place]
    getPlaceByDate(tripId: ID, date: DateTime): Place
  }

  #inputs
  input PlaceInput {
    text: String!
    place_name: String!
    mapbox_id: String!
    start: DateTime
    end: DateTime
    order: Int!
    bbox: [Float]
    center: [Float]
    geometry: [Float]
    colour: String
  }

  # types
  type Place {
    id: ID!
    text: String!
    place_name: String!
    mapbox_id: String!
    start: DateTime
    end: DateTime
    order: Int!
    geometry: [Float]
    colour: String
    dayPlans(date: DateTime): [DayPlan!]
  }
`
