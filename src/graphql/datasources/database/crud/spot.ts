import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, Spot } from '@prisma/client'
import { Context } from '../../../../types/auth'

export default class SpotAPI extends DataSource {
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

  findHighestOrderSpot = async (dayPlanId: string) => {
    return await this.prisma.spot.aggregate({
      where: {
        dayPlanId,
      },
      _max: {
        order: true,
      },
    })
  }

  addSpotToDayPlan = async (spot: Spot) => {
    return await this.prisma.spot.create({
      data: {
        ...spot,
      },
    })
  }

  deleteSpot = async (id: string) => {
    return await this.prisma.spot.delete({
      where: {
        id,
      },
    })
  }
}
