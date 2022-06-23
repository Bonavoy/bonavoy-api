// FILE COMBINES ALL DATASOURCES TO ONE OBJ

//external apis
import FoursquareAPI from "./api/foursquare";

//crud
import UserAPI from "./database/crud/user";
import SessionAPI from "./database/crud/session";
// import Sessions from "./database/crud/session";
// import Trips from "./database/crud/trip";
// import DayPlan from "./database/crud/dayPlan";

// db
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  //mongo
  users: new UserAPI({ prisma }),
  sessions: new SessionAPI({ prisma }),
  // trips: new Trips(tripModel as any),
  // dayPlans: new DayPlan(dayPlanModel as any),

  //external
  foursquareAPI: new FoursquareAPI(),
};
