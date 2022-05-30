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
    username: String!
    token: String!
    refreshToken: String!
  }
`;
