import startServer from './src';
import connectDb from './src/database';

//start server
startServer();

//connect mongodb
connectDb();
