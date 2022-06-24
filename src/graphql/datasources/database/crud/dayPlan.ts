import { DataSource } from 'apollo-datasource'

import { PrismaClient, DayPlan } from '@prisma/client'

import { Context } from '../../../../types/auth'

export default class DayPlanAPI extends DataSource {
  prisma: PrismaClient
  context: Context

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
    this.context = {} as Context
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
