import { AuthorsOnTrips, PrismaClient, TripRole } from '@prisma/client'
import { DataSource } from 'apollo-datasource'
import DataLoader from 'dataloader'

import { Context } from '@bonavoy/types/auth'
import { DBAuthorsOnTrips } from '../../types'

export default class AuthorsOnTripsAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
  }

  find = (tripId: string) => {
    return this.prisma.authorsOnTrips.findMany({
      where: {
        tripId,
      },
    })
  }

  create = async (userId: string, tripId: string, role: TripRole) => {
    return await this.prisma.authorsOnTrips.create({
      data: {
        userId,
        tripId,
        role,
      },
    })
  }

  createMany = async (authorOnTrips: DBAuthorsOnTrips[]) => {
    return await this.prisma.authorsOnTrips.createMany({
      data: authorOnTrips,
    })
  }
}
