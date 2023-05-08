import { DataSource, DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, Transportation, Prisma } from '@prisma/client'
import { Context } from '@bonavoy/types/auth'
import DataLoader from 'dataloader'
import { DBTransportation } from '@bonavoy/graphql/datasources/types'

export default class TransportationAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined
  transportationListLoader: DataLoader<string, Transportation[][]>

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
    this.transportationListLoader = new DataLoader(async (ids) => {
      const placeIds = ids.map((placeId) => String(placeId))
      const transportationList = await this.prisma.transportation.findMany({
        where: {
          placeId: {
            in: placeIds,
          },
        },
      })

      const connectingTransportationMap = new Map<string, Transportation[]>()

      for (const transportation of transportationList) {
        if (connectingTransportationMap.has(transportation.connectingId)) {
          connectingTransportationMap.get(transportation.connectingId)!.push(transportation)
        } else {
          connectingTransportationMap.set(transportation.connectingId, [transportation])
        }
      }

      const transportationListMap = new Map<string, Transportation[][]>()

      for (const connectedTransportation of connectingTransportationMap.values()) {
        if (transportationListMap.has(connectedTransportation[0].placeId)) {
          transportationListMap.get(connectedTransportation[0].placeId)!.push(connectedTransportation)
        } else {
          transportationListMap.set(connectedTransportation[0].placeId, [connectedTransportation])
        }
      }

      return placeIds.map((placeId) => transportationListMap.get(placeId) || [])
    })
  }

  create = async (placeId: string, transportation: DBTransportation) => {
    this.transportationListLoader.clear(placeId)
    return this.prisma.$transaction(async (tx) => {
      const transportationArr = await tx.transportation.findMany({
        select: {
          connectingId: true,
          type: true,
          placeId: true,
        },
        where: {
          placeId,
        },
      })

      if (transportationArr.length && transportationArr[transportationArr.length - 1].type !== transportation.type) {
        throw new Error('Connecting transportation must be of the same type')
      }

      let connectingTransportationCounts = new Map<string, number>()
      transportationArr.forEach((dbTransportation) => {
        if (connectingTransportationCounts.has(dbTransportation.connectingId)) {
          connectingTransportationCounts.set(
            dbTransportation.connectingId,
            connectingTransportationCounts.get(dbTransportation.connectingId)! + 1,
          )
        } else {
          connectingTransportationCounts.set(dbTransportation.connectingId, 1)
        }
      })

      return await this.prisma.transportation.create({
        data: {
          id: transportation.id,
          departureLocation: transportation.departureLocation,
          departureTime: transportation.departureTime,
          arrivalLocation: transportation.arrivalLocation,
          arrivalTime: transportation.arrivalTime,
          details: transportation.details,
          type: transportation.type,
          placeId: placeId,
          order: transportation.order,
          connectingId: transportation.connectingId,
          connectingOrder: connectingTransportationCounts.get(transportation.connectingId),
        },
      })
    })
  }

  find = async (placeId: string) => {
    return this.transportationListLoader.load(placeId)
  }

  update = async (id: string, transportationInput: Prisma.TransportationUpdateInput) => {
    const updatedTransportation = await this.prisma.transportation.update({
      where: {
        id: id,
      },
      data: {
        ...transportationInput,
      },
    })
    this.transportationListLoader.clear(updatedTransportation.placeId)
    return updatedTransportation
  }

  delete = async (id: string) => {
    const deleteTransportation = await this.prisma.transportation.delete({
      where: {
        id,
      },
    })
    this.transportationListLoader.clear(deleteTransportation.placeId)
    return deleteTransportation
  }
}
