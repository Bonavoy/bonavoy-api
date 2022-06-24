import { DataSource } from "apollo-datasource";

//types
import { Context } from "../../../../types/auth";
import type { PrismaClient, User } from "@prisma/client";
export default class UserAPI extends DataSource {
  prisma: PrismaClient;
  context: Context;

  constructor({ prisma }: { prisma: PrismaClient }) {
    super();
    this.prisma = prisma;
    this.context = {} as Context;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize = (config: any) => {
    this.context = config.context;
  };

  createUser = async (user: User): Promise<User | null> => {
    try {
      return this.prisma.user.create({
        data: user,
      });
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null;
    }
  };

  // can be {id}
  // can be {username}
  // can be {email}
  findUser = async (query: object): Promise<User | null> => {
    try {
      return this.prisma.user.findUnique({
        where: query,
      });
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null;
    }
  };

  findUserByUsername = async (username?: string): Promise<User | null> => {
    try {
      return this.prisma.user.findUnique({
        where: { username },
      });
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null;
    }
  };
  findUserByEmail = async (email?: string): Promise<User | null> => {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) return null;
      return null;
    }
  };
}
