import { createApplication } from 'graphql-modules';

//modules
import userModule from './User/user.module.graphql';
import tripModule from './Trip/trip.module.graphql';
import locationModule from './Location/location.module.graphql';
import dayPlanModule from './DayPlan/dayPlan.module.graphql';
import spotOfInterestModule from './SpotOfInterest/spotOfInterest.module.graphql';

//combine all resolvers and types
export const apolloApplication = createApplication({
  modules: [
    userModule,
    tripModule,
    locationModule,
    spotOfInterestModule,
    dayPlanModule,
  ],
});
