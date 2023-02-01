import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, Activity } from '@prisma/client'
import { Context } from '../../../../types/auth'
import DataLoader from 'dataloader'
import { DBActivity } from '../../types'

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

  createActivity = async (dayPlanId: string, activity: DBActivity) => {
    return await this.prisma.activity.create({
      data: {
        name: activity.name,
        order: activity.order,
        startTime: activity.startTime,
        endTime: activity.endTime,
        dayPlanId: dayPlanId,
      },
    })
  }

  batchActivityLists = new DataLoader(async (ids) => {
    const dayPlanIds = ids.map((dayPlanId) => String(dayPlanId))

    const activities = await this.prisma.activity.findMany({
      where: {
        dayPlanId: {
          in: dayPlanIds,
        },
      },
    })

    const activityListMap = new Map<string, Activity[]>()

    for (const activity of activities) {
      if (activityListMap.has(activity.dayPlanId)) {
        activityListMap.get(activity.dayPlanId)?.push(activity)
      } else {
        activityListMap.set(activity.dayPlanId, [activity])
      }
    }

    return dayPlanIds.map((dayPlanId) => activityListMap.get(dayPlanId) || [])
  })

  findActivities = async (dayPlanId: string) => {
    return this.batchActivityLists.load(dayPlanId)
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
