import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = () => {
  mongoose.connect(
    process.env.MONGO_DATABASE_CONNECTION_STRING as string,
    () => {
      console.log('Main DB Connected.');
    }
  );
  mongoose.connection.on('error', (error) => console.error(error));
};

export default connectDb;
