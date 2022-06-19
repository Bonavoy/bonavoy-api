import { gql } from 'graphql-modules';

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    getTrip(tripId: ID): Trip
  }

  #mutations
  type Mutation {
    createTrip(trip: TripInput): Trip
  }

  #inputs
  input TripInput {
    name: String
    isPublic: Boolean
    places: [PlaceInput]
    author: String
  }

  # todo: need to move place module
  input PlaceInput {
    mapbox_id: String
    name: String
    from: String
    to: String
    duration: Int
    dayPlan: DayPlanInput
  }

  input DayPlanInput {
    date: String
    spotsOfInterest: [SpotOfInterestInput]
  }

  #types
  type Trip {
    id: ID
    name: String
    author: String
    isPublic: Boolean
    places: [Place]
  }

  type Place {
    id: ID
    name: String
    mapbox_id: String
    from: String
    to: String
    duration: Int
    dayPlan: [DayPlan]
  }
`;
