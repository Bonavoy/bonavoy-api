import { DataSource } from 'apollo-datasource'

//types
import type { DataSourceConfig } from 'apollo-datasource'
import type { PrismaClient, TripRole } from '@prisma/client'
import { Context } from '@bonavoy/types/auth'
import { DBInvite } from '../../types'

export default class InviteAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined

  constructor(prisma: PrismaClient) {
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

  findManyByTripId = async (tripId: string) => {
    return await this.prisma.invite.findMany({
      where: {
        tripId,
      },
    })
  }

  findManyByEmail = async (email: string) => {
    return await this.prisma.invite.findMany({
      where: {
        email,
      },
    })
  }

  findInvite = async (email: string, tripId: string) => {
    return await this.prisma.invite.findFirst({
      where: {
        email,
        tripId,
      },
    })
  }

  create = async (invite: DBInvite) => {
    return this.prisma.invite.create({
      data: {
        ...invite,
      },
    })
  }

  updateRole = async (id: string, role: TripRole) => {
    return await this.prisma.invite.update({
      where: {
        id,
      },
      data: {
        role,
      },
    })
  }

  deleteMany = async (email: string) => {
    return await this.prisma.invite.deleteMany({
      where: {
        email,
      },
    })
  }

  delete = async (id: string) => {
    return await this.prisma.invite.delete({
      where: {
        id,
      },
    })
  }
}
