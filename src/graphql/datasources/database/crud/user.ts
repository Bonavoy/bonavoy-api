import { DataSource } from 'apollo-datasource'

//types
import { Context } from '../../../../types/auth'
import type { PrismaClient, User } from '@prisma/client'
import type { KeyvAdapter } from '../../../../utils/redisKeyValueCache'

export default class UserAPI extends DataSource {
  prisma: PrismaClient
  context: Context | null
  cache: KeyvAdapter | null

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
    this.context = null
    this.cache = null
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize = (config: any) => {
    this.context = config.context
    this.cache = config.cache
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

  createUserSession = async ({ id, refresh, ttl }: { id: string; refresh: string; ttl: number }): Promise<void> => {
    await this.cache?.set(id, refresh)
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

  findUserByUsername = async (username?: string): Promise<User | null> => {
    try {
      return this.prisma.user.findUnique({
        where: { username },
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null
    }
  }
  findUserByEmail = async (email?: string): Promise<User | null> => {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null
    }
  }
}
