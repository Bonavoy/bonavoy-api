export const mutations = `
  createUser(
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    refresh: [String!]!
  ): User!
  
  authenticate(username: String!, password: String!): Boolean!

  token: Boolean!
`;
