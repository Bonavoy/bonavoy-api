import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

import { AuthenticationError } from 'apollo-server-express';
import {
  signAccessToken,
  signRefreshToken,
  tokenPayloadBuilder,
  validateUserSession,
} from '../../../utils/auth';

//types
import { AuthContext, TokenDecoded } from '../../../types/auth';

export default {
  Query: {
    user: (_: unknown, args: unknown) => {
      return {
        id: '12345',
        email: 'some.user@email.com',
        password: 'Pa$$w0rd!',
        loggedIn: false,
        firstName: 'Some',
        lastName: 'User',
      };
    },
  },
  Mutation: {
    createUser: (_: unknown, args: unknown) => {
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
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: any }
    ) => {
      //get user from db
      const dbUser = await dataSources.users.getOneUser({ username: username });
      //if no user, throw error
      if (!dbUser) {
        throw new AuthenticationError('Invalid credentials');
      }
      //promise due to needing to wait for async cb by compare function
      return await new Promise((resolve) => {
        bcrypt.compare(password, dbUser.password, async (err, result) => {
          if (err) resolve(false);
          if (result) {
            //since we login, we make new refresh token while there are still refresh tokens that are valid hence array
            //then save to db
            const newRefresh = signRefreshToken(dbUser._id);

            //create session document with expiry
            await dataSources.sessions.createSession({
              user: dbUser._id,
              token: newRefresh,
              expireAt: new Date(
                Date.now() + Number(process.env.REFRESH_TOKEN_LIFETIME)
              ),
            });

            //send refresh as httponly cookie
            res.cookie('RTC', newRefresh, {
              httpOnly: true,
              secure: true,
              maxAge: Number(process.env.REFRESH_TOKEN_LIFETIME),
              sameSite: 'none',
              path: '/',
              signed: true,
            });

            //send token as httponly cookie
            //place more sensitive in this cookie
            res.cookie('ATC', signAccessToken(tokenPayloadBuilder(dbUser)), {
              httpOnly: true,
              secure: true,
              maxAge: Number(process.env.ACCESS_TOKEN_LIFETIME),
              sameSite: 'none',
              path: '/',
              signed: true,
            });

            resolve(true);
          } else throw new AuthenticationError('Invalid credentials');
        });
      });
    },
    token: async (
      _parent: unknown,
      _args: unknown,
      { ctx, req, res }: { ctx: AuthContext; req: Request; res: Response }
    ) => {
      //if no info in token, dont bother doing everything else
      if (!ctx.refresh.sub) throw new AuthenticationError('Invalid token');

      //see if valid refresh token and user
      const validatedUser = await validateUserSession(
        req.signedCookies.RTC,
        ctx.refresh.sub
      );

      if (validatedUser) {
        //send an access token back
        res.cookie('ATC', signAccessToken(tokenPayloadBuilder(validatedUser)), {
          httpOnly: true,
          secure: true,
          maxAge: Number(process.env.ACCESS_TOKEN_LIFETIME),
          sameSite: 'none',
          path: '/',
          signed: true,
        });
      } else throw new AuthenticationError('Invalid token');

      return true;
    },
  },
};
