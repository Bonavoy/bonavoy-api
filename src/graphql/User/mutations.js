export const mutations = `
  createUser(
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  ): User
  
  authenticate(username: String!, password: String!): Authenticate!

  refresh: String
`;
