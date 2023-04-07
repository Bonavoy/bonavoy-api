import 'dotenv/config'
import express from 'express'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { json } from 'body-parser'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import rawSchema from './graphql'
import { applyMiddleware } from 'graphql-middleware'

//redis
import Keyv from 'keyv'
import { KeyvAdapter } from './utils/classes/KeyvAdapter'

//utils
import permissions from './graphql/permissions'

//types
import type { AuthContext, Context } from './types/auth'
import { verifyAccessToken, verifyRefreshToken } from './auth/auth'
import datasources from './graphql/datasources'

const startServer = async () => {
  //express app start
  const app = express()

  //middleware to run berfore apollo server
  app.use(cookieParser(process.env.COOKIE_SECRET))

  const isDevelopmentEnv = process.env.NODE_ENV === 'development'

  const schema = makeExecutableSchema(rawSchema)
  //apollo
  const apolloServer = new ApolloServer<Context>({
    schema: applyMiddleware(schema, permissions),
    csrfPrevention: true,
    plugins: isDevelopmentEnv ? [] : [ApolloServerPluginLandingPageDisabled()],
    cache: new KeyvAdapter(new Keyv(`redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URI}`)),
  })

  //all though not required to start (started automatically), its highly reccommended
  await apolloServer.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: isDevelopmentEnv
        ? ['http://localhost:4000', 'https://studio.apollographql.com', 'http://localhost:3000']
        : ['https://planner.bonavoy.com'],
      credentials: true,
    }),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
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

        if (req.signedCookies?.[process.env.REFRESH_TOKEN_NAME as string]) {
          //access token
          const { token } = verifyAccessToken(req.signedCookies?.[process.env.ACCESS_TOKEN_NAME as string])
          //refresh token
          const { refresh } = verifyRefreshToken(req.signedCookies?.[process.env.REFRESH_TOKEN_NAME as string])
          auth = { ...token, refresh: { ...refresh } }
        }
        return { auth, req, res, dataSources: datasources }
      },
    }),
  )

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}/graphql`)
  })
}

export default startServer
