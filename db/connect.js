import Mongoose from 'mongoose';
import config from '../config/config';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  const dbHost = config.dbHost;
  const dbPort = config.dbPort;
  const dbName = config.dbName;
  try {
    await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
      useMongoClient: true,
    });
    console.log('Connected to mongo!!!');
  } catch (err) {
    console.log('Could not connect to MongoDB');
  }
};

export default connectToDb;
