import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, DayPlan } from '@prisma/client'
import { Context } from '../../../../types/auth'

export interface CreateDayPlan {
  date: Date
  order: number
  placeId: string
}

export interface FindDayPlanFilters {
  date: Date
  tripId?: string
  placeId?: string
}

export default class DayPlanAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize = (config: DataSourceConfig<Context>) => {
    this.context = config.context
  }

  /**
   * gets the day plan for a given date in a trip
   *
   * @param tripId
   * @param date
   * @returns
   */
  findDayPlan = async ({ date, tripId, placeId }: FindDayPlanFilters): Promise<DayPlan | null> => {
    return await this.prisma.dayPlan.findFirst({
      where: {
        place: {
          ...(tripId && { tripId }),
          ...(placeId && { placeId }),
        },
        date,
      },
      include: {
        activities: true,
      },
    })
  }

  createDayPlan = async (dayPlan: CreateDayPlan) => {
    return await this.prisma.dayPlan.create({
      data: {
        ...dayPlan,
      },
    })
  }
}
