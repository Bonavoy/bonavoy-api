import { gql } from 'apollo-server-express';

export const types = gql`
  input SpotOfInterestInput {
    fsq_id: String!
    from: String
    to: String
  }

  input SearchSpotOfInterestInput {
    coords: CoordsInput
    limit: Int
    filter: String
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

  input CoordsInput {
    lat: Float
    lng: Float
  }
`;
