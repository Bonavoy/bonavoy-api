// FILE COMBINES ALL DATASOURCES TO ONE OBJ
import { PrismaClient } from '@prisma/client'

//external apis
import FoursquareAPI from './api/foursquare'
import UnsplashAPI from './api/unsplash'

//crud
import UserAPI from './database/crud/user'
import TripsAPI from './database/crud/trip'
import DayPlanAPI from './database/crud/dayPlan'
import PlaceAPI from './database/crud/place'
import SpotAPI from './database/crud/spot'
import AuthorAPI from './database/crud/author'

const prisma = new PrismaClient()

export interface BonavoyDataSources {
  users: UserAPI
  authors: AuthorAPI
  trips: TripsAPI
  dayPlans: DayPlanAPI
  places: PlaceAPI
  spots: SpotAPI
  foursquareAPI: FoursquareAPI
  unsplashAPI: UnsplashAPI
}

export default {
  // postgres
  users: new UserAPI({ prisma }),
  trips: new TripsAPI({ prisma }),
  dayPlans: new DayPlanAPI({ prisma }),
  places: new PlaceAPI({ prisma }),
  spots: new SpotAPI({ prisma }),
  authors: new AuthorAPI({ prisma }),

  //external
  unsplashAPI: new UnsplashAPI(),
}
