import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const URI = mongoServer.getUri();
    console.log('MONGO URI: ', URI);
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to connect Database');
  }
};
