// FILE COMBINES ALL DATASOURCES TO ONE OBJ
import { PrismaClient } from '@prisma/client';

//external apis
import FoursquareAPI from './api/foursquare';

//crud
import UserAPI from './database/crud/user';
import SessionAPI from './database/crud/session';
import TripsAPI from './database/crud/trip';

const prisma = new PrismaClient();

export interface BonavoyDataSources {
  users: UserAPI;
  sessions: SessionAPI;
  trips: TripsAPI;
  foursquareAPI: FoursquareAPI;
}

export default {
  // postgres
  users: new UserAPI({ prisma }),
  sessions: new SessionAPI({ prisma }),
  trips: new TripsAPI({ prisma }),
  // dayPlans: new DayPlan(dayPlanModel as any),

  //external
  foursquareAPI: new FoursquareAPI(),
};
