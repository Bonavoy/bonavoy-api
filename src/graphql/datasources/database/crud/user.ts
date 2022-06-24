import { DataSource, DataSourceConfig } from 'apollo-datasource'

//types
import { Context } from '../../../../types/auth'
import type { PrismaClient, User } from '@prisma/client'
import type { KeyvAdapter } from '../../../../utils/classes/KeyvAdapter'

export default class UserAPI extends DataSource {
  prisma: PrismaClient
  context: Context | undefined
  cache: KeyvAdapter | undefined

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
    this.cache = config.cache as KeyvAdapter
  }

  createUser = async (user: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User | null> => {
    try {
      return this.prisma.user.create({
        data: user,
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null
    }
  }

  //uses redis to store sessions with a ttl
  createUserSession = async ({ id, session, ttl }: { id: string; session: string; ttl: number }): Promise<void> => {
    const activeSessions = (await this.cache?.get(id)) as string
    if (activeSessions) {
      await this.cache?.set(id, JSON.stringify({ id, sessions: [...JSON.parse(activeSessions).sessions, session] }), {
        ttl,
      })
    } else await this.cache?.set(id, JSON.stringify({ id, sessions: [session] }), { ttl })
  }

  //finds a session and returns boolean if it exists or not
  findUserSession = async ({ id, session }: { id: string; session: string }): Promise<boolean> => {
    const activeSessions = (await this.cache?.get(id)) as string
    if (activeSessions) return JSON.parse(activeSessions).sessions.includes(session)
    else return false
  }

  // can be {id} | {username} | {email}
  findUser = async (query: object): Promise<User | null> => {
    try {
      return this.prisma.user.findUnique({
        where: query,
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null
    }
  }
}
