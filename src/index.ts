import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

import FoursquareAPI from './graphql/Datasources/foursquare';
import { verifyAccessToken, verifyRefreshToken } from './utils/auth';

//types
import type { AuthContext } from '../types/auth';
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
  app.use(cookieParser());

  //apollo
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req, res }: { req: Request; res: Response }) => {
      let ctx: AuthContext = {
        _id: null,
        username: null,
        iat: null,
        exp: null,
        token: null,
        refresh: null,
      };

      //access token
      const { token, tokenError } = verifyAccessToken(req.cookies?.ATC);

      //refresh token
      const { refresh, refreshError } = verifyRefreshToken(req.cookies?.RTC);

      console.log(tokenError?.message);
      console.log(refreshError?.message);
      if (req.cookies?.ATC) {
        ctx = { ...token, token: req.cookies?.ATC, refresh: req.cookies?.RTC };
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
      } else if (!response.data?.authenticate && !response.data?.refresh) {
        //this block only runs when aythenticate or refresh mutations are called.
        //here we are basically attaching
        // const tokenExpireDate = new Date();
        // tokenExpireDate.setDate(
        //   tokenExpireDate.getDate() + 60 * 60 * 24 * 60 // 60 days
        // );
        // const token = verifyAccessToken(
        //   response.data?.authenticate.token || response.data?.refresh
        // ) as unknown as TokenDecoded;
        // requestContext.response?.http?.headers.append(
        //   'Set-Cookie',
        //   `refresh=${signRefreshToken(token._id)}; expires=${tokenExpireDate}`
        // );
      }
      return response;
    },
    dataSources: () => {
      return {
        foursquareAPI: new FoursquareAPI(),
      };
    },
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
