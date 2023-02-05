import bcrypt from 'bcrypt'
import 'dotenv/config'

import { signAccessToken, signRefreshToken, tokenPayloadBuilder } from '@bonavoy/auth/auth'

//types
import { Context } from '@bonavoy/types/auth'
import type { User as DBUser } from '@prisma/client'
import {
  MutationCreateUserArgs,
  MutationAuthenticateArgs,
  User,
  TripRole,
  Resolvers,
  AuthorsOnTripsEdge,
  AuthorsOnTripsConnection,
} from '@bonavoy/generated/graphql'
import { GraphQLError } from 'graphql'
import { isValidEmail } from '@bonavoy/utils/validators'

const resolvers: Resolvers = {
  Query: {
    user: async (_parent: any, _args: any, ctx: Context): Promise<User> => {
      //get user from db
      const user = await ctx.dataSources.users.findUser({ id: ctx.auth.sub! })
      if (user == null) {
        throw new GraphQLError('Could not find user')
      }

      return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        verified: user.verified,
        avatar: user.avatar,
        authorsOnTrips: [] as any, // let root resolver handle
      }
    },
  },
  Mutation: {
    createUser: async (_parent: any, { userInput }: MutationCreateUserArgs, ctx: Context): Promise<User> => {
      const { email, firstname, lastname, password, username } = userInput

      if (!isValidEmail(email)) {
        throw new GraphQLError('Email is not valid')
      }

      if (!(2 <= username.length && username.length <= 64)) {
        // TODO: check for bad characters like &, !, @ ...
        throw new GraphQLError('Username needs to be between 2 and 64 characters long')
      }

      if (!(2 <= firstname.length && firstname.length <= 64)) {
        throw new GraphQLError('Firstname needs to be between 2 and 64 characters long')
      }

      if (!(2 <= lastname.length && lastname.length <= 64)) {
        throw new GraphQLError('Lastname needs to be between 2 and 64 characters long')
      }

      if (!(10 <= password.length && password.length <= 40)) {
        throw new GraphQLError('Password needs to be between 10 and 40 characters long')
      }

      const newUser = await ctx.dataSources.users.createUser({
        email,
        firstname,
        lastname,
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        avatar: null,
        verified: false,
      })

      return {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        verified: newUser.verified,
        avatar: newUser.avatar,
      } as any
    },
    authenticate: async (
      _parent: any,
      { username, password }: MutationAuthenticateArgs,
      ctx: Context,
    ): Promise<boolean> => {
      //get user from db
      const dbUser: DBUser | null = await ctx.dataSources.users.findUser({ username })

      //if no user, throw error
      if (!dbUser) throw new GraphQLError('Invalid credentials')

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
          } else throw new GraphQLError('Invalid credentials')
        })
      })
    },
    token: async (_parent: any, _args: any, ctx: Context): Promise<boolean> => {
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
  User: {
    authorsOnTrips: async (user, args, ctx: Context): Promise<AuthorsOnTripsConnection> => {
      const { limit, after } = args

      const authorsOnTrips = await ctx.dataSources.authors.findAuthorsPaginated(user.id, limit, after)
      const authorsOnTripsCount = await ctx.dataSources.authors.authorsOnTripsCount(user.id)
      // TODO: hasNextPage

      const authorsOnTripsEdges: AuthorsOnTripsEdge[] = authorsOnTrips.map((authorOnTrip) => {
        let tripRole = TripRole.Viewer
        switch (authorOnTrip.role) {
          case TripRole.Author:
            tripRole = TripRole.Author
            break
          case TripRole.Editor:
            tripRole = TripRole.Editor
            break
          default:
            tripRole = TripRole.Viewer
        }

        return {
          node: {
            id: authorOnTrip.id,
            user: {} as any, // let root resolver handle
            role: tripRole,
            trip: {} as any, // return any empty object to allow Trip resolver to handle
            tripId: authorOnTrip.tripId, // return so the authorsOnTrips root resolver has access
          },
        }
      })

      return {
        edges: authorsOnTripsEdges,
        totalCount: authorsOnTripsCount,
        pageInfo: {
          endCursor: authorsOnTrips[authorsOnTrips.length - 1]?.id || '',
          hasNextPage: true,
        },
      }
    },
  },
}

export default resolvers
