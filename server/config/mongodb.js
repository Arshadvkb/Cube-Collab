import mongoose, { Mongoose } from 'mongoose';

const connectDb = async () => {
  mongoose
    .connect(`${process.env.MONGO_DB_URI}`)
    .then(() => {
      console.log('Connected to MongoDb');
    })
    .catch((err) => {
      console.log('failed to connect to mongodb');
      console.log('error', err);
    });
};

export default connectDb;
