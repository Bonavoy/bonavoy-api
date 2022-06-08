import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import { ApolloServer } from 'apollo-server-express';
import { apolloApplication } from './graphql/modules';

import { verifyAccessToken, verifyRefreshToken } from './utils/auth';
import dataSources from './graphql/datasources';

//types
import type { AuthContext } from './types/auth';
import type {
  GraphQLResponse,
  GraphQLRequestContext,
} from 'apollo-server-types';

import dotenv from 'dotenv';
dotenv.config();

const startServer = async () => {
  //express app start
  const app = express();

  //middleware to run berfore apollo server
  //TODO: BETTER COOKIE SECRET
  app.use(cookieParser(process.env.COOKIE_SECRET));

  //apollo
  const apolloServer = new ApolloServer({
    schema: apolloApplication.createSchemaForApollo(),
    csrfPrevention: true,
    context: ({ req, res }: { req: Request; res: Response }) => {
      let ctx: AuthContext = {
        sub: null,
        username: null,
        iat: null,
        exp: null,
        refresh: {
          sub: null,
          iat: null,
          exp: null,
        },
      };
      if (req.signedCookies?.RTC) {
        //access token
        const { token } = verifyAccessToken(req.signedCookies?.ATC);

        //refresh token
        const { refresh } = verifyRefreshToken(req.signedCookies?.RTC);

        ctx = { ...token, refresh: { ...refresh } };
      }
      return { ctx, req, res };
    },
    formatResponse: (
      response: GraphQLResponse,
      requestContext: GraphQLRequestContext<object>
    ): GraphQLResponse => {
      //if not auth, send 401 else make a refresh token
      if (response.errors && !requestContext.request.variables?.password) {
        if (requestContext.response?.http) {
          requestContext.response.http.status = 401;
        }
      }
      return response;
    },
    dataSources: () => dataSources,
  });

  //all though not required to start (started automatically), its highly reccommended
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  });
};

export default startServer;
