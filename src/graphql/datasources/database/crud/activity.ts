import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, Activity } from '@prisma/client'
import { Context } from '../../../../types/auth'

export default class ActivityAPI extends DataSource {
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

  findHighestOrderActivity = async (dayPlanId: string) => {
    return await this.prisma.activity.aggregate({
      where: {
        dayPlanId,
      },
      _max: {
        order: true,
      },
    })
  }

  addActivityToDayPlan = async (activity: Activity) => {
    return await this.prisma.activity.create({
      data: {
        ...activity,
      },
    })
  }

  deleteActivity = async (id: string) => {
    return await this.prisma.activity.delete({
      where: {
        id,
      },
    })
  }
}
