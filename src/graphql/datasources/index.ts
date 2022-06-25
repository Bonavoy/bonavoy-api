// FILE COMBINES ALL DATASOURCES TO ONE OBJ
import { PrismaClient } from '@prisma/client'

//external apis
import FoursquareAPI from './api/foursquare'

//crud
import UserAPI from './database/crud/user'
import TripsAPI from './database/crud/trip'
import DayPlanAPI from './database/crud/dayPlan'
import PlaceAPI from './database/crud/place'

const prisma = new PrismaClient()

export interface BonavoyDataSources {
  users: UserAPI
  trips: TripsAPI
  foursquareAPI: FoursquareAPI
  dayPlans: DayPlanAPI
  places: PlaceAPI
}

export default {
  // postgres
  users: new UserAPI({ prisma }),
  trips: new TripsAPI({ prisma }),
  dayPlans: new DayPlanAPI({ prisma }),
  places: new PlaceAPI({ prisma }),

  //external
  foursquareAPI: new FoursquareAPI(),
}
