import { gql } from "graphql-modules";

export default gql`
  #queries
  type Query {
    user: User
  }

  #mutations
  type Mutation {
    createUser(input: UserInput): User
    authenticate(username: String!, password: String!): Boolean!
    token: Boolean!
  }

  #input
  input UserInput {
    username: String!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  #types
  type User {
    id: ID!
    email: String!
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    avatar: String
    verified: Boolean!
    trips: [Trip]
  }
`;
