import { AuthorsOnTrips, PrismaClient } from '@prisma/client'
import { DataSource } from 'apollo-datasource'

import { Context } from '../../../../types/auth'

export default class AuthorsAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
  }

  findAuthors = async (userId: string, limit: number, after?: string | null): Promise<AuthorsOnTrips[]> => {
    return await this.prisma.authorsOnTrips.findMany({
      where: {
        userId,
      },
      take: limit,
    })
  }
}
