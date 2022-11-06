import bcrypt from 'bcrypt'
import 'dotenv/config'

import { AuthenticationError } from 'apollo-server-express'
import { signAccessToken, signRefreshToken, tokenPayloadBuilder } from '../../../utils/auth'

//types
import { Context } from '../../../types/auth'
import type { User } from '@prisma/client'
import { UserInput } from '../../../generated/graphql'
import { GraphQLError } from 'graphql'
import { validateEmail } from '../../../utils/validators'

export default {
  Query: {
    user: async (_: unknown, args: unknown, ctx: Context) => {
      //get user from db
      return await ctx.dataSources.users.findUser({ id: ctx.auth.sub })
    },
  },
  Mutation: {
    createUser: async (_: unknown, { input }: { input: UserInput }, ctx: Context) => {
      const { email, firstname, lastname, password, username } = input
      // check username length
      if (!(2 <= username.length && username.length <= 50)) {
        throw new GraphQLError('Username must be between 2 and 50 characters')
      }

      // check firstname length
      if (!(2 <= firstname.length && firstname.length <= 50)) {
        throw new GraphQLError('Firstname must be between 2 and 50 characters')
      }

      // check lastname length
      if (!(2 <= lastname.length && lastname.length <= 50)) {
        throw new GraphQLError('Lastname must be between 2 and 50 characters')
      }

      // check password length
      if (!(6 <= password.length && password.length <= 32)) {
        throw new GraphQLError('Password must be between 6 and 32 characters')
      }

      // check email valid
      if (!validateEmail(email)) {
        throw new GraphQLError('Email is invalid')
      }

      const newUser = await ctx.dataSources.users.createUser({
        ...input,
        password: bcrypt.hashSync(input.password, bcrypt.genSaltSync(10)),
        avatar: null,
        verified: false,
      })

      return newUser
    },

    authenticate: async (_: unknown, { username, password }: { username: string; password: string }, ctx: Context) => {
      //get user from db
      const dbUser: User | null = await ctx.dataSources.users.findUser({ username })

      //if no user, throw error
      if (!dbUser) throw new AuthenticationError('Invalid credentials')

      //promise due to needing to wait for async cb by compare function
      return await new Promise((resolve) => {
        bcrypt.compare(password, dbUser.password, async (err, result) => {
          if (err) resolve(false)
          if (result) {
            //since we login, we make new refresh token while there are still refresh tokens that are valid hence array
            //then save to db
            const newRefresh = signRefreshToken(dbUser.id)

            //create session document with expiry
            await ctx.dataSources.users.createUserSession({
              user: dbUser,
              session: newRefresh,
              ttl: Number(process.env.REFRESH_TOKEN_LIFETIME),
            })

            //send refresh as httponly cookie
            ctx.res.cookie(process.env.REFRESH_TOKEN_NAME as string, newRefresh, {
              httpOnly: true,
              secure: true,
              maxAge: Number(process.env.REFRESH_TOKEN_LIFETIME),
              sameSite: 'none',
              path: '/',
              signed: true,
            })

            //send token as httponly cookie
            //place more sensitive in this cookie
            ctx.res.cookie(process.env.ACCESS_TOKEN_NAME as string, signAccessToken(tokenPayloadBuilder(dbUser)), {
              httpOnly: true,
              secure: true,
              maxAge: Number(process.env.ACCESS_TOKEN_LIFETIME),
              sameSite: 'none',
              path: '/',
              signed: true,
            })

            resolve(true)
          } else throw new AuthenticationError('Invalid credentials')
        })
      })
    },
    token: async (_parent: unknown, _args: unknown, ctx: Context) => {
      //using id and refreshtoken, we see if the session is valid on redis
      const validSession = await ctx.dataSources.users.findUserSession({
        id: ctx.auth.refresh.sub as string,
        session: ctx.req.signedCookies?.[process.env.REFRESH_TOKEN_NAME as string],
      })

      if (validSession) {
        //send an access token back
        return !!ctx.res.cookie(
          process.env.ACCESS_TOKEN_NAME as string,
          signAccessToken(tokenPayloadBuilder(validSession)),
          {
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.ACCESS_TOKEN_LIFETIME),
            sameSite: 'none',
            path: '/',
            signed: true,
          },
        )
      }

      return false
    },
  },
}
