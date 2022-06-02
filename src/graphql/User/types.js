export const types = `
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
