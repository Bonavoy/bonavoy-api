import express from 'express';

import { verifyAccessToken } from './utils/auth';

import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

import dotenv from 'dotenv';
dotenv.config();

import FoursquareAPI from './graphql/Datasources/foursquare';
// import { validateToken } from './middleware/auth';

const startServer = async () => {
  //express app start
  const app = express();

  //apollo
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req, res }) => {
      try {
        if (req.headers['x-access-token']) {
          const token = verifyAccessToken(req.headers['x-access-token']);
          return token;
        }
      } catch {
        return { req, res };
      }
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

  // middleware
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));

  // routes
  // app.use('/auth', routes.authRoutes);
  // app.use('/newsletter', routes.newsletterRoutes);
  // app.use('/flights', routes.flightRoutes);
  // app.use('/lodging', routes.lodgingRoutes);

  // auth middleware
  // app.use(validateToken);

  // authenticated routes
  // app.use('/users', routes.userRoutes);
  // app.use('/trips', routes.tripRoutes);

  // general error handler
  // NOTE: Must be last middleware
  app.use((error, req, res, next) => {
    return res.status(500).json({ status: 1, message: error.toString() });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  });
};

export default startServer;
