import 'dotenv/config'
import express, { Request, Response } from 'express'
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cookieParser from 'cookie-parser'

import { ApolloServer } from 'apollo-server-express'
import rawSchema from './graphql'
import { applyMiddleware } from 'graphql-middleware'

//redis
import Keyv from 'keyv'
import { KeyvAdapter } from './utils/classes/KeyvAdapter'

//utils
import { verifyAccessToken, verifyRefreshToken } from './utils/auth'
import dataSources from './graphql/datasources'
import permissions from './graphql/permissions'

//types
import type { AuthContext } from './types/auth'

const startServer = async () => {
  //express app start
  const app = express()

  //middleware to run berfore apollo server
  app.use(cookieParser(process.env.COOKIE_SECRET))

  const isDevelopmentEnv = process.env.NODE_ENV === 'development'

  const schema = makeExecutableSchema(rawSchema)
  //apollo
  const apolloServer = new ApolloServer({
    schema: schema,
    // executor: apolloApplication.createApolloExecutor(),
    csrfPrevention: true,
    plugins: isDevelopmentEnv ? [] : [ApolloServerPluginLandingPageDisabled()],
    cache: new KeyvAdapter(new Keyv(`redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URI}`)),
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

      if (req.signedCookies?.[process.env.REFRESH_TOKEN_NAME as string]) {
        //access token
        const { token } = verifyAccessToken(req.signedCookies?.[process.env.ACCESS_TOKEN_NAME as string])

        //refresh token
        const { refresh } = verifyRefreshToken(req.signedCookies?.[process.env.REFRESH_TOKEN_NAME as string])

        auth = { ...token, refresh: { ...refresh } }
      }
      return { auth, req, res }
    },
    dataSources: () => dataSources,
  })

  //all though not required to start (started automatically), its highly reccommended
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: isDevelopmentEnv
        ? ['http://localhost:3000', 'https://studio.apollographql.com']
        : ['https://planner.bonavoy.com'],
      credentials: true,
    },
    path: '/',
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
  })
}

export default startServer
