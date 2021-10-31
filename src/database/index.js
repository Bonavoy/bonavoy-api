import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = () => {
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
};

export default connectDb;
