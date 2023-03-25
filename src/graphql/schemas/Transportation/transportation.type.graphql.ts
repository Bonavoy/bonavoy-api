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
    updateTransportation(id: ID!, transportation: TransportationInput!): Transportation!
    deleteTransportation(id: ID!): Transportation!
  }

  # inputs
  input TransportationInput {
    type: TransportationType!
    departure_location: String!
    departure_time: DateTime
    arrival_location: String!
    arrival_time: DateTime
    details: String!
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
  }

  enum TransportationType {
    CAR
    PLANE
    BUS
  }
`
