import { PrismaClient, TripRole } from '@prisma/client'
import { DataSource } from 'apollo-datasource'

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

  updateRole = async (id: string, role: TripRole) => {
    return await this.prisma.authorsOnTrips.update({
      where: {
        id,
      },
      data: {
        role,
      },
    })
  }

  createMany = async (authorOnTrips: DBAuthorsOnTrips[]) => {
    return await this.prisma.authorsOnTrips.createMany({
      data: authorOnTrips,
    })
  }

  delete = async (id: string) => {
    const deletedAuthorOnTrip = await this.prisma.authorsOnTrips.delete({
      where: {
        id,
      },
    })

    return deletedAuthorOnTrip.id
  }
}
