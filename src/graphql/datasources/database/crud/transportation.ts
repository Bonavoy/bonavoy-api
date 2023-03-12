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

  find = async (placeId: string) => {
    return this.batchTransportationLists.load(placeId)
  }

  batchTransportationLists = new DataLoader(async (ids) => {
    const placeIds = ids.map((placeId) => String(placeId))

    const transportations = await this.prisma.transportation.findMany({
      where: {
        placeId: {
          in: placeIds,
        },
      },
    })

    const transportationListMap = new Map<string, Transportation[]>()

    for (const transportation of transportations) {
      if (transportationListMap.has(transportation.placeId)) {
        transportationListMap.get(transportation.placeId)?.push(transportation)
      } else {
        transportationListMap.set(transportation.placeId, [transportation])
      }
    }

    return placeIds.map((placeId) => transportationListMap.get(placeId) || [])
  })
}
