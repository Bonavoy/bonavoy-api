import express from 'express';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import * as routes from './routes';
import { validateToken } from './middleware/auth';
import { swaggerOptions } from './config/docs';

dotenv.config();

const app = express();
const specs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/auth', routes.authRoutes);

// auth middleware
app.use(validateToken);

// authenticated routes
app.use('/api/users', routes.userRoutes);
app.use('/api/trips', routes.tripRoutes);

// general error handler
// NOTE: Must be last middleware
app.use((error, req, res, next) => {
  return res.status(500).json({ status: 1, message: error.toString() });
});

export default app;
