import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, DayPlan } from '@prisma/client'
import { Context } from '../../../../types/auth'
import DataLoader from 'dataloader'
import { DBDayPlan } from '../../types'

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

  private batchDayPlanLists = new DataLoader(async (ids) => {
    const placeIds = ids.map((placeId) => String(placeId))

    const places = await this.prisma.dayPlan.findMany({
      where: {
        placeId: {
          in: placeIds,
        },
      },
    })

    const dayPlanListMap = new Map<string, DayPlan[]>()

    for (const dayPlan of places) {
      if (dayPlanListMap.has(dayPlan.placeId)) {
        dayPlanListMap.get(dayPlan.placeId)?.push(dayPlan)
      } else {
        dayPlanListMap.set(dayPlan.placeId, [dayPlan])
      }
    }

    return placeIds.map((placeId) => dayPlanListMap.get(placeId) || [])
  })

  findDayPlans = async (placeId: string) => {
    return this.batchDayPlanLists.load(placeId)
  }

  createDayPlan = async (placeId: string, dayPlan: DBDayPlan): Promise<DayPlan> => {
    // get count of dayPlans in place
    return await this.prisma.dayPlan.create({
      data: {
        placeId,
        order: dayPlan.order,
        date: dayPlan.date,
      },
    })
  }
}
