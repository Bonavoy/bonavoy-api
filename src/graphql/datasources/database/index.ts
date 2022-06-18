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

  // TODO: need to find a better way to register models for .populate() nested ObjectId's
  // https://intellipaat.com/community/34120/mongoose-schema-hasnt-been-registered-for-model
  require('./models/spotOfInterest');
  require('./models/trip');
  require('./models/dayPlan');
  require('./models/place');
  require('./models/user');
  require('./models/session');

  mongoose.connection.on('error', (error) => console.error(error));
};

export default connectDb;
