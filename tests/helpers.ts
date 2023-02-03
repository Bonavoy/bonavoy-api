import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import UserAPI from '@bonavoy/graphql/datasources/database/crud/user'
import TripsAPI from '@bonavoy/graphql/datasources/database/crud/trip'
import DayPlanAPI from '@bonavoy/graphql/datasources/database/crud/dayPlan'
import PlaceAPI from '@bonavoy/graphql/datasources/database/crud/place'
import UnsplashAPI from '@bonavoy/graphql/datasources/api/unsplash'
import ActivityAPI from '@bonavoy/graphql/datasources/database/crud/activity'

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
    unsplashAPI: new UnsplashAPI(),
  }
  // return new ApolloServer({ schema: makeExecutableSchema(schema), dataSources: () => mockedDatasources}) TODO: Fix
}
