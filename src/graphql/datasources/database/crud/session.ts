// import Session from '../models/session';
// import { MongoSession } from '../models/session';

// import { MongoDataSource } from 'apollo-datasource-mongodb';

// export default class Sessions extends MongoDataSource<MongoSession> {
//   async createSession(session: {
//     user: string;
//     token: string;
//     expireAt: Date;
//   }) {
//     return await Session.create({
//       user: session.user,
//       token: session.token,
//       expireAt: session.expireAt,
//     });
//   }

//   async getSession(query: object) {
//     return await Session.findOne(query);
//   }
// }

import { DataSource } from "apollo-datasource";
import { PrismaClient, Session } from "@prisma/client";
import { Context } from "../../../../types/auth";

export default class SessionAPI extends DataSource {
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
    this.context = config.context;
  }

  async createSession(session: Session) {
    this.prisma.session.create({ data: session });
  }

  //get session using token and user id
  async getSession(query: { token: string; userId: string }) {
    this.prisma.session.findFirst({
      where: { userId: query.userId, token: query.token },
    });
  }
}
