import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import * as routes from './routes';
// import { validateToken } from './middleware/auth';
import { swaggerOptions } from './config/docs';

dotenv.config();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World';
    },
  },
};

const startServer = async () => {
  //express app start
  const app = express();

  //apollo
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  //want to apply middleware to all routes that whay not called cors in appluMiddlware function for apollo server
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://bonavoy.com'],
    })
  );

  //all though not required to start (started automatically), its highly reccommended
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  //docs
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerOptions))
  );

  // middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // routes
  app.use('/auth', routes.authRoutes);
  app.use('/newsletter', routes.newsletterRoutes);
  app.use('/locations', routes.locationRoutes);
  app.use('/flights', routes.flightRoutes);
  app.use('/lodging', routes.lodgingRoutes);

  // auth middleware
  // app.use(validateToken);

  // authenticated routes
  app.use('/users', routes.userRoutes);
  app.use('/trips', routes.tripRoutes);

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
