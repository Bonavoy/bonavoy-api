import express from 'express';
import dotenv from 'dotenv';

import * as routes from './routes';
import { addUser } from './middleware/auth';
dotenv.config();

const app = express();

app.use('/api/auth', routes.authRoutes);
app.use('/api/users', routes.userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
