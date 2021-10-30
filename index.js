import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import * as routes from './routes';
import { validateToken } from './middleware/auth';
dotenv.config();

const app = express();

// connect to database
mongoose.connect(
  process.env.MONGO_DATABASE_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Main DB Connected.');
  }
);
mongoose.set('useCreateIndex', true); // required for legacy mongoose code
mongoose.connection.on('error', (error) => console.error(error));

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

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

export default app;
