import { gql } from 'graphql-modules'

export default gql`
  # queries
  type Query {
    findPlacesByTrip(tripId: ID): [Place]
    findPlaceByDate(tripId: ID, date: DateTime): Place
  }

  # types
  type Place {
    id: ID!
    name: String!
    mapbox_id: String!
    start: DateTime
    end: DateTime
    order: Int!
    duration: Int!
    dayPlans: [DayPlan!]
  }
`
