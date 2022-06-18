// FILE COMBINES ALL DATASOURCES TO ONE OBJ

//external apis
import FoursquareAPI from './api/foursquare';

//mongo models
import userModel from './database/models/user';
import sessionModel from './database/models/session';
import tripModel from './database/models/trip';
import dayPlanModel from './database/models/dayPlan';

//mongo crud
import Users from './database/crud/user';
import Sessions from './database/crud/session';
import Trips from './database/crud/trip';
import DayPlan from './database/crud/dayPlan';

export default {
  //mongo
  users: new Users(userModel as any),
  sessions: new Sessions(sessionModel as any),
  trips: new Trips(tripModel as any),
  dayPlans: new DayPlan(dayPlanModel as any),

  //external
  foursquareAPI: new FoursquareAPI(),
};
