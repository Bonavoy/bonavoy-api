import bcrypt from 'bcrypt';
import fs from 'fs';
import * as crud from '../../database/crud/user';

import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { signAccessToken } from '../../utils/auth';
import { signRefreshToken } from '../../utils/auth';

const queries = {
  user: (_, args) => {
    return {
      id: '12345',
      email: 'some.user@email.com',
      password: 'Pa$$w0rd!',
      loggedIn: false,
      firstName: 'Some',
      lastName: 'User',
    };
  },
};

const mutations = {
  createUser: (_, args) => {
    // const newUser = {
    //   id: '54321',
    //   email: args.email,
    //   password: args.password,
    //   loggedIn: false,
    //   firstName: args.firstName,
    //   lastName: args.lastName,
    // };
    // return newUser;
  },

  authenticate: async (_, { username, password }) => {
    //get user from db
    const dbUser = await crud.getOneUser({ username: username });
    //if no user, throw error
    if (!dbUser) {
      throw new AuthenticationError('Invalid credentials');
    }

    //promise due to needing to wait for async cb by compare function
    return await new Promise((resolve, _) => {
      bcrypt.compare(password, dbUser.password, (err, result) => {
        if (err) throw new ValidationError('BCRYPT ERROR');
        if (result) {
          const user = { username: dbUser.username, _id: dbUser._id };
          resolve({
            ...user,
            token: signAccessToken(user),
            refreshToken: signRefreshToken(user),
          });
        } else throw new AuthenticationError('Invalid credentials');
      });
    });
  },
};

export const resolvers = { queries, mutations };
