import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

import dotenv from 'dotenv';
dotenv.config();

import FoursquareAPI from './graphql/Datasources/foursquare';
import { verifyAccessToken, signRefreshToken } from './utils/auth';

//types
import type { TokenDecoded } from '../types/auth';
import type {
  GraphQLResponse,
  GraphQLRequestContext,
} from 'apollo-server-types';

const startServer = async () => {
  //express app start
  const app = express();

  //apollo
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req, res }: { req: any; res: any }) => {
      let ctx: TokenDecoded = {
        _id: null,
        username: null,
        iat: null,
        exp: null,
      };
      try {
        if (req.headers['x-access-token']) {
          ctx = {
            ...(verifyAccessToken(
              req.headers['x-access-token']
            ) as unknown as TokenDecoded),
          };
        }
      } catch (e) {}
      return { ctx, res };
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
      } else if (response.data?.authenticate || response.data?.refresh) {
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
