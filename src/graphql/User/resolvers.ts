import bcrypt from 'bcrypt';
import * as crud from '../../database/crud/user';

import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { signAccessToken, signRefreshToken } from '../../utils/auth';

//types
import { TokenDecoded, TokenPayload } from '../../../types/auth';

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

  authenticate: async (
    _: unknown,
    { username, password }: { username: string; password: string },
    { ctx, res }: { ctx: TokenDecoded; res: any }
  ) => {
    //get user from db
    const dbUser = await crud.getOneUser({ username: username });
    //if no user, throw error
    if (!dbUser) {
      throw new AuthenticationError('Invalid credentials');
    }
    //promise due to needing to wait for async cb by compare function
    return await new Promise((resolve) => {
      bcrypt.compare(password, dbUser.password, (err, result) => {
        if (err) throw new ValidationError('BCRYPT ERROR');
        if (result) {
          const user: TokenPayload = {
            username: dbUser.username,
            _id: dbUser._id,
          };

          //send refresh as httponly cookie
          res.cookie('session', signAccessToken(user), {
            httpOnly: true,
            secure: true,
            maxAge: 50000,
            sameSite: 'None',
          });
          // resolve({
          //   ...user,
          //   token: signAccessToken(user),
          //   refresh: signRefreshToken(dbUser._id),
          // });
          resolve(signAccessToken(user));
        } else throw new AuthenticationError('Invalid credentials');
      });
    });
  },
};

export const resolvers = { queries, mutations };
