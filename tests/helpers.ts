import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from '@apollo/server'

import schema from '../src/graphql'

import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import UserAPI from '../src/graphql/datasources/database/crud/user'
import TripsAPI from '../src/graphql/datasources/database/crud/trip'
import DayPlanAPI from '../src/graphql/datasources/database/crud/dayPlan'
import PlaceAPI from '../src/graphql/datasources/database/crud/place'
import FoursquareAPI from '../src/graphql/datasources/api/foursquare'
import UnsplashAPI from '../src/graphql/datasources/api/unsplash'
import ActivityAPI from '../src/graphql/datasources/database/crud/activity'

export type PrismaMock = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): PrismaMock => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}

export function createTestServer(prismaMock: PrismaMock) {
  const mockedDatasources = {
    // postgres
    users: new UserAPI(prismaMock),
    trips: new TripsAPI(prismaMock),
    dayPlans: new DayPlanAPI(prismaMock),
    places: new PlaceAPI(prismaMock),
    activity: new ActivityAPI(prismaMock),

    //external
    foursquareAPI: new FoursquareAPI(),
    unsplashAPI: new UnsplashAPI(),
  }
  // return new ApolloServer({ schema: makeExecutableSchema(schema), dataSources: () => mockedDatasources}) TODO: Fix
}
