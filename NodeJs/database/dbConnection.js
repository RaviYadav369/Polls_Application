import mongoose from 'mongoose'

import 'dotenv/config';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name';
    
    await mongoose.connect(mongoURI, {

    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);

    process.exit(1); 
  }
};

export default connectDB;
