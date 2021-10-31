import express from 'express';
import dotenv from 'dotenv';

import * as routes from './routes';
import { validateToken } from './middleware/auth';
dotenv.config();

const app = express();

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
  return res.status(500).json({ error: error.toString() });
});

export default app;
