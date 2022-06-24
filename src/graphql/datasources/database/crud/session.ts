import { DataSource } from 'apollo-datasource'

//types
import type { PrismaClient, Session, User } from '@prisma/client'
import { Context } from '../../../../types/auth'

export default class SessionAPI extends DataSource {
  prisma: PrismaClient
  context: Context

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
    this.context = {} as Context
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize = (config: any) => {
    console.log(config)
    this.context = config.context
  }

  createSession = async (session: Omit<Session, 'id' | 'createdAt'>) => {
    this.prisma.session.create({ data: session })
  }

  //get session using token and user id
  getSession = async (query: { token: string; userId: string }): Promise<(Session & { user: User }) | null> => {
    try {
      return this.prisma.session.findFirst({
        where: { userId: query.userId, token: query.token },
        include: {
          user: true,
        },
      })
    } catch (e) {
      return null
    }
  }
}
