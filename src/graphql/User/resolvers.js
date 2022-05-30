import bcrypt from 'bcrypt';
import fs from 'fs';
import * as crud from '../../database/crud/user';

import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { signAccessToken } from '../../utils/auth';
import { signRefreshToken } from '../../utils/auth';

const secret = fs.readFileSync('secret.key', 'utf-8');
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8');

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

    bcrypt.compare(password, dbUser.password, (err, results) => {
      if (err) throw new ValidationError('BCRYPT ERROR');
      if (results) {
        const username = { username: dbUser.username };
        const token = signAccessToken(username, secret);
        const refreshToken = signRefreshToken(username, refreshTokenSecret);
        return { ...username, token, refreshToken };
      } else throw new AuthenticationError('Invalid credentials');
    });
  },
};

export const resolvers = { queries, mutations };
