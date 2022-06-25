import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, DayPlan } from '@prisma/client'
import { Context } from '../../../../types/auth'

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

  findDayPlanByDate = async (placeId: string, date: string) => {
    return await this.prisma.dayPlan.findFirst({
      where: {
        date: date,
        place: {
          id: placeId,
        },
      },
    })
  }

  createDayPlan = async (dayPlan: DayPlan) => {
    return await this.prisma.dayPlan.create({
      data: {
        ...dayPlan,
      },
    })
  }
}
