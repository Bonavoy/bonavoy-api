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
    geometry: GeometryInput
  }

  input GeometryInput {
    type: String
    coordinates: [Float]
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
    geometry: Geometry
    dayPlans(date: DateTime): [DayPlan!]
  }

  type Geometry {
    type: String
    coordinates: [Float]
  }
`
