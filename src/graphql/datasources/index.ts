// FILE COMBINES ALL DATASOURCES TO ONE OBJ
import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'

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
import Planner from './database/crud/planner'

const prisma = new PrismaClient()
const redis = new Redis({
  host: process.env.REDIS_PLANNER_PRESENCE_URI!,
  port: Number(process.env.REDIS_PLANNER_PRESENCE_PORT!),
  password: process.env.REDIS_PLANNER_PRESENCE_PASSWORD!,
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
})

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
  planner: Planner
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
  planner: new Planner(redis),

  //external
  unsplashAPI: new UnsplashAPI(),
  mapboxAPI: new MapboxAPI(),
} as BonavoyDataSources
