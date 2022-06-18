import { gql } from 'graphql-modules';

export default gql`
  #queries
  type Query {
    user(id: String!): User
  }

  #mutations
  type Mutation {
    createUser(input: UserInput): User!
    authenticate(username: String!, password: String!): Boolean!
    token: Boolean!
  }

  #input
  input UserInput {
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  #types
  type User {
    id: ID
    email: String
    password: String
    loggedIn: Boolean
    firstName: String
    lastName: String
    trips: [Trip]
  }

  type Authenticate {
    _id: String!
    username: String!
    token: String!
    refresh: String!
  }
`;