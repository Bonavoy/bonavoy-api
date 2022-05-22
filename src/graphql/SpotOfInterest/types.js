import { gql } from 'apollo-server-express';

export const types = gql`
  input SpotOfInterestInput {
    coords: CoordsInput
    filter: String
  }

  type SpotOfInterest {
    fsq_id: ID
    name: String
    rating: Int
    coords: Coords
  }

  type Coords {
    lat: Int
    lng: Int
  }

  input CoordsInput {
    lat: Int
    lng: Int
  }
`;
