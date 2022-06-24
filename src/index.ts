import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import redis from 'redis'

import { ApolloServer } from 'apollo-server-express'
import { apolloApplication } from './graphql/modules'
import { applyMiddleware } from 'graphql-middleware'

import { verifyAccessToken, verifyRefreshToken } from './utils/auth'
import dataSources from './graphql/datasources'
import permissions from './graphql/permissions'

//types
import type { AuthContext } from './types/auth'
// import type {
//   GraphQLResponse,
//   GraphQLRequestContext,
// } from "apollo-server-types";

import dotenv from 'dotenv'
dotenv.config()

const startServer = async () => {
  //express app start
  const app = express()

  //middleware to run berfore apollo server
  app.use(cookieParser(process.env.COOKIE_SECRET))

  //redis
  const redis_client = redis.createClient({
    url: `redis://default:S5ie0zd00Fi1nDvAqiFgONvUWVlkxkp7@redis-18821.c1.us-west-2-2.ec2.cloud.redislabs.com:18821`,
  })
  await redis_client.connect()

  //apollo
  const apolloServer = new ApolloServer({
    schema: applyMiddleware(apolloApplication.createSchemaForApollo(), permissions),
    csrfPrevention: true,
    context: ({ req, res }: { req: Request; res: Response }) => {
      let auth: AuthContext = {
        sub: null,
        username: null,
        iat: null,
        exp: null,
        refresh: {
          sub: null,
          iat: null,
          exp: null,
        },
      }
      if (req.signedCookies?.session) {
        //access token
        const { token } = verifyAccessToken(req.signedCookies?.ATC)

        //refresh token
        const { refresh } = verifyRefreshToken(req.signedCookies?.session)

        auth = { ...token, refresh: { ...refresh } }
      }
      return { auth, req, res }
    },
    // formatResponse: (
    //   response: GraphQLResponse,
    //   requestContext: GraphQLRequestContext<object>
    // ): GraphQLResponse => {
    //   //if not auth, send 401 else make a refresh token
    //   if (response.errors && !requestContext.request.variables?.password) {
    //     if (requestContext.response?.http) {
    //       requestContext.response.http.status = 401;
    //     }
    //   }
    //   return response;
    // },
    dataSources: () => dataSources,
  })

  //all though not required to start (started automatically), its highly reccommended
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
  })
}

export default startServer
