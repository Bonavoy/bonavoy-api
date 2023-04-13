import { gql } from 'graphql-tag'

export default gql`
  # queries
  type Query {
    transportation(placeId: ID!): [Transportation!]!
    # reorder
  }

  # mutations
  type Mutation {
    addTransportation(placeId: ID!, transportation: TransportationInput!): Transportation!
    updateTransportation(id: ID!, transportation: UpdateTransportationInput!): Transportation!
    deleteTransportation(id: ID!): ID!
  }

  type Subscription {
    transportation(placeIds: [ID!]!): Transportation!
  }

  # inputs
  input TransportationInput {
    type: TransportationType!
    departure_location: String!
    departure_time: DateTime
    arrival_location: String!
    arrival_time: DateTime
    details: String!
    arrivalCoords: InputCoords
    departureCoords: InputCoords
    # order TODO
  }

  input UpdateTransportationInput {
    type: TransportationType
    departure_location: String
    departure_time: DateTime
    arrival_location: String
    arrival_time: DateTime
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
    departure_location: String!
    departure_time: DateTime
    arrival_location: String!
    arrival_time: DateTime
    details: String!
    order: Int!
    arrivalCoords: Coords
    departureCoords: Coords
  }

  type Coords {
    lat: Float!
    lng: Float!
  }

  type TransportationNotification {
    transportation: Transportation!
    type: NotificationType!
  }

  enum TransportationType {
    CAR
    PLANE
    BUS
  }

  enum NotificationType {
    CREATE
    UPDATE
    DELETE
  }
`
