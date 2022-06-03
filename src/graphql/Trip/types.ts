export const types = `
  input TripInput {
    name: String
    isPublic: Boolean
    places: [PlaceInput]
    author: String
  }

  type Trip {
    id: ID
    name: String
    author: String
    isPublic: Boolean
  }
`;
