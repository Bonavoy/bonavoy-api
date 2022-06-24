import { gql } from 'graphql-modules'

export default gql`
  # queries
  type Query {
    getTripDayPlans(tripId: ID): [Place]
  }

  # types
  type Place {
    id: ID
    name: String
    mapbox_id: String
    start: String
    end: String
    order: Int
    duration: Int
    tripId: ID
  }
`
