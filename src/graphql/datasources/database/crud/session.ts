import Session from '../models/session';
import { MongoSession } from '../models/session';

import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Sessions extends MongoDataSource<MongoSession> {
  async createSession(session: {
    user: string;
    token: string;
    expireAt: Date;
  }) {
    return await Session.create({
      user: session.user,
      token: session.token,
      expireAt: session.expireAt,
    });
  }

  async getSession(query: object) {
    return await Session.findOne(query);
  }
}
