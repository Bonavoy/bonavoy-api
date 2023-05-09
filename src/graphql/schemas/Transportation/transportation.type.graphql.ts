import { gql } from 'graphql-tag'

export default gql`
  # queries
  type Query {
    transportation(placeId: ID!): [[Transportation!]!]!
    # reorder
  }

  # mutations
  type Mutation {
    addTransportation(placeId: ID!, transportation: TransportationInput!): Transportation!
    updateTransportation(id: ID!, transportation: UpdateTransportationInput!): Transportation!
    deleteTransportation(id: ID!): ID!
  }

  type Subscription {
    transportation(placeIds: [ID!]!): TransportationNotification!
  }

  # inputs
  input TransportationInput {
    id: ID!
    type: TransportationType!
    departureLocation: String!
    departureTime: DateTime
    arrivalLocation: String!
    arrivalTime: DateTime
    details: String!
    arrivalCoords: InputCoords
    departureCoords: InputCoords
    connectingId: String!
    order: Int!
    # order TODO
  }

  input UpdateTransportationInput {
    type: TransportationType
    departureLocation: String
    departureTime: DateTime
    arrivalLocation: String
    arrivalTime: DateTime
    details: String
    arrivalCoords: InputCoords
    departureCoords: InputCoords
    # order TODO
  }

  input InputCoords {
    lat: Float!
    lng: Float!
  }

  # types
  type Transportation {
    id: ID!
    type: TransportationType!
    departureLocation: String!
    departureTime: DateTime
    arrivalLocation: String!
    arrivalTime: DateTime
    details: String!
    order: Int!
    arrivalCoords: Coords
    departureCoords: Coords
    connectingId: ID!
    connectingOrder: Int!
  }

  type Coords {
    lat: Float!
    lng: Float!
  }

  type TransportationNotification {
    transportation: Transportation!
    placeId: ID
    deleted: Boolean!
  }

  enum TransportationType {
    CAR
    PLANE
    BUS
  }
`
