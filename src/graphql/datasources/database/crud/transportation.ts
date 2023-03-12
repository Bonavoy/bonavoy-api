import { DataSource, DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, Transportation, Prisma } from '@prisma/client'

import { Context } from '@bonavoy/types/auth'
import DataLoader from 'dataloader'
import { DBTransportation } from '@bonavoy/graphql/datasources/types'

export default class TransportationAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
  }

  create = async (placeId: string, transportation: DBTransportation) => {
    return await this.prisma.transportation.create({
      data: {
        id: transportation.id,
        departure_location: transportation.departure_location,
        departure_time: transportation.departure_time,
        arrival_location: transportation.arrival_location,
        arrival_time: transportation.arrival_time,
        details: transportation.details,
        type: transportation.type,
        placeId: placeId,
      },
    })
  }
}
