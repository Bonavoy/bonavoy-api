import { shield } from "graphql-shield";

//rules
import { isAuthenticated } from "./rules";

export default shield({
  Query: {
    user: isAuthenticated,
  },
  Mutation: {
    token: isAuthenticated,
    createTrip: isAuthenticated,
  },
});
