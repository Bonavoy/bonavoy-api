import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

import { AuthenticationError } from "apollo-server-express";
import {
  signAccessToken,
  signRefreshToken,
  tokenPayloadBuilder,
} from "../../../utils/auth";

//types
import { Context } from "../../../types/auth";
import type { User, Session } from "@prisma/client";

export default {
  Query: {
    user: (_: unknown, args: unknown, ctx: Context) => {
      return {
        id: "12345",
        email: "some.user@email.com",
        password: "Pa$$w0rd!",
        loggedIn: false,
        firstName: "Some",
        lastName: "User",
      };
    },
  },
  Mutation: {
    createUser: async (
      _: unknown,
      { input }: { input: User },
      ctx: Context
    ) => {
      const newUser = await ctx.dataSources.users.createUser({
        ...input,
        password: bcrypt.hashSync(input.password, bcrypt.genSaltSync(10)),
      });

      return newUser;
    },

    authenticate: async (
      _: unknown,
      { username, password }: { username: string; password: string },
      ctx: Context
    ) => {
      //get user from db
      const dbUser: User = await ctx.dataSources.users.findUser({ username });

      //if no user, throw error
      if (!dbUser) return false;

      //promise due to needing to wait for async cb by compare function
      return await new Promise((resolve) => {
        bcrypt.compare(password, dbUser.password, async (err, result) => {
          if (err) resolve(false);
          if (result) {
            //since we login, we make new refresh token while there are still refresh tokens that are valid hence array
            //then save to db
            const newRefresh = signRefreshToken(dbUser.id);

            //create session document with expiry
            await ctx.dataSources.sessions.createSession({
              userId: dbUser.id,
              token: newRefresh,
              expireAt: new Date(
                Date.now() + Number(process.env.REFRESH_TOKEN_LIFETIME)
              ),
            });

            //send refresh as httponly cookie
            ctx.res.cookie("session", newRefresh, {
              httpOnly: true,
              secure: true,
              maxAge: Number(process.env.REFRESH_TOKEN_LIFETIME),
              sameSite: "none",
              path: "/",
              signed: true,
            });

            //send token as httponly cookie
            //place more sensitive in this cookie
            ctx.res.cookie(
              "ATC",
              signAccessToken(tokenPayloadBuilder(dbUser)),
              {
                httpOnly: true,
                secure: true,
                maxAge: Number(process.env.ACCESS_TOKEN_LIFETIME),
                sameSite: "none",
                path: "/",
                signed: true,
              }
            );

            resolve(true);
          } else throw new AuthenticationError("Invalid credentials");
        });
      });
    },
    token: async (_parent: unknown, _args: unknown, ctx: Context) => {
      const user: Session & { user: User } =
        ctx.dataSources.sessions.getSession({
          token: ctx.req.signedCookies.session,
          userId: ctx.auth.refresh.sub,
        });

      if (user) {
        //send an access token back
        return !!ctx.res.cookie(
          "ATC",
          signAccessToken(tokenPayloadBuilder(user.user)),
          {
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.ACCESS_TOKEN_LIFETIME),
            sameSite: "none",
            path: "/",
            signed: true,
          }
        );
      }
      return false;
    },
  },
};
