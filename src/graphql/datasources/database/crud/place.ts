import { DataSource } from 'apollo-datasource'

import { PrismaClient } from '@prisma/client'

import { Context } from '../../../../types/auth'

export default class PlaceAPI extends DataSource {
  prisma: PrismaClient
  context: Context

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
    this.context = {} as Context
  }

  async findPlacesByTrip(tripId: string) {
    return await this.prisma.place.findMany({
      orderBy: {
        order: 'asc',
      },
      where: {
        tripId,
      },
    })
  }
}
