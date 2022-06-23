import { DataSource } from "apollo-datasource";
import { PrismaClient, User } from "@prisma/client";
import { Context } from "../../../../types/auth";

export default class UserAPI extends DataSource {
  prisma: PrismaClient;
  context: Context;

  constructor({ prisma }: any) {
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
  initialize(config: any) {
    console.log(config);
    this.context = config.context;
  }

  async createUser(user: User) {
    await this.prisma.user.create({
      data: user,
    });
  }
}
