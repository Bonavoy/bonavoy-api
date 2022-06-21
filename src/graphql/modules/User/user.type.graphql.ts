import { gql } from "graphql-modules";

export default gql`
  #queries
  type Query {
    user: User
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
    _id: String
    email: String
    username: String
    firstname: String
    lastname: String
    password: String
    userImage: String
    verified: Boolean
    trips: [Trip]
  }

  type Authenticate {
    _id: String!
    username: String!
    token: String!
    refresh: String!
  }
`;
