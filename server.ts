import startServer from './src';
import connectDb from './src/graphql/datasources/database';

//connect mongodb
connectDb();

//start server
startServer();
