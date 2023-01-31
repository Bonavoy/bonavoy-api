import { DataSource, DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, Place } from '@prisma/client'

import { Context } from '../../../../types/auth'
import DataLoader from 'dataloader'

export default class PlaceAPI extends DataSource {
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

  findPlaceById = async (placeId: string): Promise<Place | null> => {
    return await this.prisma.place.findUnique({
      where: {
        id: placeId,
      },
    })
  }

  private batchPlaceLists = new DataLoader<string, Place[]>(async (ids) => {
    const tripIds = ids.map((tripId) => String(tripId))
    const places = await this.prisma.place.findMany({
      where: {
        tripId: {
          in: tripIds,
        },
      },
    })
    const placeListMap = new Map<string, Place[]>()

    for (const place of places) {
      if (placeListMap.has(place.tripId)) {
        placeListMap.get(place.tripId)?.push(place)
      } else {
        placeListMap.set(place.tripId, [place])
      }
    }

    return tripIds.map((tripId) => placeListMap.get(tripId) || [])
  })

  findPlaces = async (tripId: string): Promise<Place[]> => {
    return this.batchPlaceLists.load(tripId)
  }

  findPlacesByTrip = async (tripId: string): Promise<Place[]> => {
    return await this.prisma.place.findMany({
      where: {
        tripId,
      },
      include: {
        dayPlans: {
          include: {
            activities: true,
          },
        },
      },
    })
  }

  /**
   *
   * @param tripId the trip to find place in
   * @param date date of trip to get place for
   * @returns Place | null
   */
  findPlaceByDate = async (tripId: string, date: Date): Promise<Place | null> => {
    return await this.prisma.place.findFirst({
      where: {
        tripId,
        startDate: {
          lte: date,
        },
        endDate: {
          gte: date,
        },
      },
      include: {
        // todo: only include if GraphQL query has asked for this field
        dayPlans: {
          include: {
            activities: true,
          },
        },
      },
    })
  }

  deletePlace = async (placeId: string): Promise<{ id: string }> => {
    return await this.prisma.place.delete({
      where: {
        id: placeId,
      },
      select: {
        id: true,
      },
    })
  }

  createPlace = async (place: Omit<Place, 'tripId'>, tripId: string) => {
    return await this.prisma.place.create({
      data: {
        tripId,
        ...place,
      },
    })
  }

  updatePlaceDates = async (placeId: string, startDate: Date, endDate: Date) => {
    return await this.prisma.place.update({
      where: {
        id: placeId,
      },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      select: {
        startDate: true,
        endDate: true,
      },
    })
  }
}
