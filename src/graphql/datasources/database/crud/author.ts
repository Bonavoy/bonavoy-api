import { AuthorsOnTrips, PrismaClient } from '@prisma/client'
import { DataSource } from 'apollo-datasource'
import DataLoader from 'dataloader'

import { Context } from '../../../../types/auth'

export default class AuthorsAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
  }

  findAuthorsPaginated = async (userId: string, limit: number, after?: string | null): Promise<AuthorsOnTrips[]> => {
    return await this.prisma.authorsOnTrips.findMany({
      where: {
        userId,
      },
      take: limit,
    })
  }

  private batchAuthorLists = new DataLoader<string, AuthorsOnTrips[]>(async (ids) => {
    const tripIds = ids.map((tripId) => String(tripId))
    const authors = await this.prisma.authorsOnTrips.findMany({
      where: {
        tripId: {
          in: tripIds,
        },
      },
    })
    const authorListsMap = new Map<string, AuthorsOnTrips[]>()

    for (const author of authors) {
      if (authorListsMap.has(author.tripId)) {
        authorListsMap.get(author.tripId)?.push(author)
      } else {
        authorListsMap.set(author.tripId, [author])
      }
    }

    return tripIds.map((tripId) => authorListsMap.get(tripId) || [])
  })

  findAuthors = async (tripId: string): Promise<AuthorsOnTrips[]> => {
    return this.batchAuthorLists.load(tripId)
  }
}
