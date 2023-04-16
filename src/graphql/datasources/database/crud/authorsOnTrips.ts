import { AuthorsOnTrips, PrismaClient } from '@prisma/client'
import { DataSource } from 'apollo-datasource'
import DataLoader from 'dataloader'

import { Context } from '@bonavoy/types/auth'

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
}
