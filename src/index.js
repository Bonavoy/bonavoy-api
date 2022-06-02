import express from 'express';
import guid from 'guid';

import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

import dotenv from 'dotenv';
dotenv.config();

import FoursquareAPI from './graphql/Datasources/foursquare';
import { verifyAccessToken } from './utils/auth';

const startServer = async () => {
  //express app start
  const app = express();

  //apollo
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req, res }) => {
      let ctx = {
        _id: null,
        username: null,
        refreshToken: null,
      };
      try {
        if (req.headers['x-access-token']) {
          ctx = { ...verifyAccessToken(req.headers['x-access-token']) };
        }
      } catch (e) {}
      return ctx;
    },
    formatResponse: (response, requestContext) => {
      //if not auth, send 401 else make a refresh token
      if (response.errors && !requestContext.request.variables?.password) {
        if (requestContext.response?.http) {
          requestContext.response.http.status = 401;
        }
      } else if (response.data?.authenticate || response.data?.refresh) {
        // const tokenExpireDate = new Date();
        // tokenExpireDate.setDate(
        //   tokenExpireDate.getDate() + 60 * 60 * 24 * 60 // 60 days
        // );
        // const refreshToken = guid.raw();
        // const token = jwt.verify(
        //   response.data?.authenticate || response.data?.refresh,
        //   JWT_SECRET
        // );
        // refreshTokens[refreshToken] = token.data;
        // const refreshToken = jwt.sign({ data: refreshToken }, JWT_SECRET, {
        //   expiresIn: "7 days",
        // });
        // requestContext.response?.http?.headers.append(
        //   "Set-Cookie",
        //   `refreshToken=${refreshToken}; expires=${tokenExpireDate}`
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
