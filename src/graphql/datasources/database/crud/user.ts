import User from '../models/user';
import { MongoUser } from '../../../../types/models';

import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Users extends MongoDataSource<MongoUser> {
  async createUser(user: MongoUser) {
    return await User.create({
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      userImage: null,
    });
  }

  async getUser(query: object) {
    return await User.find(query);
  }

  async getOneUser(query: object) {
    return await User.findOne(query);
  }

  // async updateUser() {}

  // async deleteUser() {}
}
