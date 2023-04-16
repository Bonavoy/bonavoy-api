// FILE COMBINES ALL DATASOURCES TO ONE OBJ
import { PrismaClient } from '@prisma/client'

//external apis
import UnsplashAPI from './api/unsplash'
import MapboxAPI from './api/mapbox'

//crud
import UserAPI from './database/crud/user'
import TripsAPI from './database/crud/trip'
import DayPlanAPI from './database/crud/dayPlan'
import PlaceAPI from './database/crud/place'
import ActivityAPI from './database/crud/activity'
import AuthorAPI from './database/crud/author'
import TransportationAPI from './database/crud/transportation'
import AuthorsOnTripsAPI from './database/crud/authorsOnTrips'

const prisma = new PrismaClient()

export interface BonavoyDataSources {
  users: UserAPI
  authors: AuthorAPI
  authorsOnTrips: AuthorsOnTripsAPI
  trips: TripsAPI
  dayPlans: DayPlanAPI
  places: PlaceAPI
  activity: ActivityAPI
  unsplashAPI: UnsplashAPI
  transportation: TransportationAPI
  mapboxAPI: MapboxAPI
}

export default {
  // postgres
  users: new UserAPI({ prisma }),
  trips: new TripsAPI({ prisma }),
  dayPlans: new DayPlanAPI({ prisma }),
  places: new PlaceAPI({ prisma }),
  activity: new ActivityAPI({ prisma }),
  authors: new AuthorAPI({ prisma }),
  transportation: new TransportationAPI({ prisma }),
  authorsOnTrips: new AuthorsOnTripsAPI({ prisma }),

  //external
  unsplashAPI: new UnsplashAPI(),
  mapboxAPI: new MapboxAPI(),
} as BonavoyDataSources
