import { DataSource, DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, Place, Prisma } from '@prisma/client'

import { Context } from '@bonavoy/types/auth'
import DataLoader from 'dataloader'
import { DBPlace } from '@bonavoy/graphql/datasources/types'

export default class PlaceAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined
  private placeListLoader: DataLoader<string, Place[]>

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
    this.placeListLoader = new DataLoader<string, Place[]>(async (ids) => {
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

  findPlace = async (placeId: string): Promise<Place | null> => {
    return await this.prisma.place.findUnique({
      where: {
        id: placeId,
      },
    })
  }

  findPlaces = async (tripId: string): Promise<Place[]> => {
    return this.placeListLoader.load(tripId)
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

  deletePlace = async (placeId: string): Promise<Place> => {
    return await this.prisma.place.delete({
      where: {
        id: placeId,
      },
    })
  }

  createPlace = async (tripId: string, place: DBPlace) => {
    this.placeListLoader.clear(tripId)
    return await this.prisma.place.create({
      data: {
        tripId,
        mapbox_id: place.mapbox_id,
        place_name: place.place_name,
        text: place.text,
        startDate: place.startDate,
        endDate: place.endDate,
        colour: place.colour,
        center: place.center,
        country: place.country,
      },
    })
  }

  updatePlace = async (id: string, place: Prisma.PlaceUpdateInput) => {
    return await this.prisma.place.update({
      where: {
        id,
      },
      data: {
        place_name: place.place_name,
        mapbox_id: place.mapbox_id,
        text: place.text,
        startDate: place.startDate,
        endDate: place.endDate,
        colour: place.colour,
        center: place.center,
        country: place.country,
      },
    })
  }
}
