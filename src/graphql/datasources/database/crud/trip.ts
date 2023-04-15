import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { Place, PrismaClient, Trip } from '@prisma/client'
import { Context } from '@bonavoy/types/auth'
import { DBTrip } from '@bonavoy/graphql/datasources/types'
import DataLoader from 'dataloader'

export default class TripsAPI extends DataSource {
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

  createTrip = async (userId: string, trip: DBTrip) => {
    return await this.prisma.trip.create({
      data: {
        name: trip.name,
        banner: '',
        startDate: trip.startDate,
        endDate: trip.endDate,
        authors: {
          create: {
            userId: userId,
            role: 'AUTHOR',
          },
        },
        places: {
          create: trip.places.map((place) => ({
            mapboxId: place.mapboxId,
            placeName: place.placeName,
            text: place.text,
            startDate: place.startDate,
            endDate: place.endDate,
            colour: place.colour,
            center: place.center,
            country: place.country,
          })),
        },
      },
    })
  }

  findTrips = async (userId: string, limit: number, after?: string | undefined | null) => {
    return await this.prisma.trip.findMany({
      where: {
        authors: {
          some: {
            userId,
          },
        },
      },
      skip: after ? 1 : 0, // skip cursor
      cursor: after ? { id: after } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })
  }

  countUserTrips = async (userId: string) => {
    return await this.prisma.trip.count({
      where: {
        authors: {
          some: {
            userId,
          },
        },
      },
    })
  }

  private batchTrips = new DataLoader<string, Trip | null | undefined>(async (ids) => {
    const tripIds = ids.map((tripId) => String(tripId))
    const trips = await this.prisma.trip.findMany({
      where: {
        id: {
          in: tripIds,
        },
      },
    })

    const tripMap = new Map<string, Trip>()

    for (const trip of trips) {
      tripMap.set(trip.id, trip)
    }

    return tripIds.map((id) => tripMap.get(id))
  })

  findTrip = async (id: string): Promise<Trip | null | undefined> => {
    return this.batchTrips.load(id)
  }

  updateTripName = async (tripId: string, name: string): Promise<{ name: string }> => {
    return await this.prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        name,
      },
      select: {
        name: true,
      },
    })
  }

  updatePlaceOrder = async (tripId: string, place: Place[]): Promise<{ places: Place[] }> => {
    return await this.prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        places: {
          deleteMany: { id: { in: place.map((pl) => pl.id) } },
          createMany: {
            data: [...place],
          },
        },
      },
      select: {
        places: true,
      },
    })
  }
}
