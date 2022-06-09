import { createApplication } from 'graphql-modules';

//modules
import userModule from './User/user.module.graphql';
import tripModule from './Trip/trip.module.graphql';
import locationModule from './Location/location.module.graphql';

//combine all rsolvers and types
export const apolloApplication = createApplication({
  modules: [userModule, tripModule, locationModule],
});
