import { gql } from 'graphql-modules';

// trips: [Trip] add this to User type once trips resolvers is setup

export default gql`
  #queries
  type Query {
    getTrip(tripId: ID): Trip
    spotOfInterest(input: SearchSpotsOfInterestInput): [SpotOfInterest]
  }

  #mutations
  type Mutation {
    createTrip(trip: TripInput): Trip
    addSpotOfInterest(input: SpotOfInterestInput): [SpotOfInterest]
  }

  #inputs
  input TripInput {
    name: String
    isPublic: Boolean
    places: [PlaceInput]
    author: String
  }

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

  input SpotOfInterestInput {
    fsq_id: String!
    from: String
    to: String
  }

  input SearchSpotsOfInterestInput {
    coords: CoordsInput
    limit: Int
    filter: String
  }

  input CoordsInput {
    lat: Float
    lng: Float
  }

  #types
  type Trip {
    id: ID
    name: String
    author: String
    isPublic: Boolean
  }

  type SpotOfInterest {
    fsq_id: ID
    name: String
    distance: Int
    coords: Coords
  }

  type Coords {
    lat: Float
    lng: Float
  }
`;
