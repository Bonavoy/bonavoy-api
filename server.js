import dotenv from 'dotenv';

import app from './src';
import connectDb from './src/database';

dotenv.config();

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
