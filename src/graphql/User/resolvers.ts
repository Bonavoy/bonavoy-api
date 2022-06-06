import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import * as crud from '../../database/crud/user';
import { AuthenticationError } from 'apollo-server-express';
import { signAccessToken, signRefreshToken } from '../../utils/auth';

//types
import { TokenDecoded, TokenPayload } from '../../../types/auth';

import dotenv from 'dotenv';
dotenv.config();

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
  createUser: (_: unknown, args) => {
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
    { ctx, req, res }: { ctx: TokenDecoded; req: Request; res: Response }
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
        if (err) resolve(false);
        if (result) {
          const user: TokenPayload = {
            username: dbUser.username,
            _id: dbUser._id,
          };

          //since we login, we make new refresh token while there are still refresh tokens that are valid hence array
          //then save to db
          const newRefresh = signRefreshToken(dbUser._id);
          dbUser.sessions = [...dbUser.sessions, newRefresh];
          dbUser.save();

          //send refresh as httponly cookie
          res.cookie('RTC', newRefresh, {
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.REFRESH_TOKEN_LIFETIME),
            sameSite: 'none',
          });

          //send token as httponly cookie
          //place more sensitive in this cookie
          res.cookie('ATC', signAccessToken(user), {
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.ACCESS_TOKEN_LIFETIME),
            sameSite: 'none',
          });

          resolve(true);
        } else throw new AuthenticationError('Invalid credentials');
      });
    });
  },
  refresh: async (
    _parent: unknown,
    _args: unknown,
    { ctx, req, res }: { ctx: TokenDecoded; req: Request; res: Response }
  ) => {
    console.log(ctx);
    return true;
  },
};

export const resolvers = { queries, mutations };
