import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { Place, PrismaClient, Trip } from '@prisma/client'
import { Context } from '../../../../types/auth'

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

  createTrip = async (trip: Trip & { places: Place[] }) => {
    return await this.prisma.trip
      .create({
        data: {
          ...trip,
          authors: {
            create: {
              userId: this.context?.auth.sub as string,
              role: 'AUTHOR',
            },
          },
          places: {
            createMany: {
              data: trip.places,
            },
          },
        },
      })
      .catch((err) => console.log(err))
  }

  findTrip = async (tripId: string) => {
    return await this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        places: true,
      },
    })
  }
}
