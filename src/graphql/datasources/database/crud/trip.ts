import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { Place, Prisma, PrismaClient, Trip } from '@prisma/client'
import { Context } from '../../../../types/auth'
import { DBAuthorsOnTrips, DBTrip } from '../../types'

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
            mapbox_id: place.mapbox_id,
            place_name: place.place_name,
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

  findTrips = async (userId: string) => {
    return await this.prisma.trip.findMany({
      where: {
        authors: {
          some: {
            userId,
          },
        },
      },
    })
  }

  findTrip = async (tripId: string): Promise<Trip | null> => {
    return await this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    })
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
