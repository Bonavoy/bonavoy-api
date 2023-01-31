import { DataSource, DataSourceConfig } from 'apollo-datasource'

//types
import { Context } from '../../../../types/auth'
import type { PrismaClient, User } from '@prisma/client'
import type { KeyvAdapter } from '../../../../utils/classes/KeyvAdapter'

interface FindUserQuery {
  id?: string
  email?: string
  username?: string
}

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

  createUser = async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    try {
      return this.prisma.user.create({
        data: user,
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      throw e
    }
  }

  //uses redis to store sessions with a ttl
  createUserSession = async ({ user, session, ttl }: { user: User; session: string; ttl: number }): Promise<void> => {
    const activeSessions = (await this.cache?.get(user.id)) as string
    if (activeSessions) {
      await this.cache?.set(
        user.id,
        JSON.stringify({ user, sessions: [...JSON.parse(activeSessions).sessions, session] }),
        {
          ttl,
        },
      )
    } else await this.cache?.set(user.id, JSON.stringify({ user, sessions: [session] }), { ttl })
  }

  //finds a session and returns boolean if it exists or not
  findUserSession = async ({ id, session }: { id: string; session: string }): Promise<User | null> => {
    const activeSessions = JSON.parse((await this.cache?.get(id)) as string)

    //return the user back
    if (activeSessions?.sessions?.includes(session)) return activeSessions.user
    else return null
  }

  findUser = async (query: FindUserQuery): Promise<User | null> => {
    console.log(query)
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
