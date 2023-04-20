import 'dotenv/config'
import express from 'express'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { json } from 'body-parser'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { createServer } from 'http'

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
import { getContext } from './apollo/context'

// REST API routes
import inviteRoutes from '@bonavoy/routes/invite'

const startServer = async () => {
  //express app start
  const app = express()

  //middleware to run berfore apollo server
  app.use(cookieParser(process.env.COOKIE_SECRET))

  const isDevelopmentEnv = process.env.NODE_ENV === 'development'

  const schema = makeExecutableSchema(rawSchema)

  // subscription and ws setup
  const httpServer = createServer(app)

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
  })

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, _msg, _args) => {
        const cookieString = ctx.extra.request['headers'].cookie?.replace(' ', '')
        if (!cookieString) return null

        const cookieArr = cookieString.split(';')
        const signedCookies: any = {}
        cookieArr.forEach((cookie) => {
          const [key, val] = cookie.split('=')
          if (!key || !val) return
          signedCookies[key] = cookieParser.signedCookie(decodeURIComponent(val), process.env.COOKIE_SECRET!)
        })

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

        if (signedCookies?.[process.env.REFRESH_TOKEN_NAME as string]) {
          //access token
          const { token } = verifyAccessToken(signedCookies?.[process.env.ACCESS_TOKEN_NAME as string])
          //refresh token
          const { refresh } = verifyRefreshToken(signedCookies?.[process.env.REFRESH_TOKEN_NAME as string])
          auth = { ...token, refresh: { ...refresh } }
        }

        return { auth, dataSources: datasources }
      },
    },
    wsServer,
  )

  const plugins = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
  ]
  if (!isDevelopmentEnv) plugins.push(ApolloServerPluginLandingPageDisabled())

  //apollo
  const apolloServer = new ApolloServer<Context>({
    schema: applyMiddleware(schema, permissions),
    csrfPrevention: true,
    plugins: plugins,
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
      context: getContext,
    }),
  )

  // REST API routes
  app.use('/api/invites', inviteRoutes)

  httpServer.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}/graphql`)
  })
}

export default startServer
