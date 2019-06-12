import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGOURI } = process.env;

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`Connection to Database established...`);
  } catch (err) {
    console.error(err.message);
    // Exit connection process
    process.exit(1);
  }
};

export default connectDatabase;
