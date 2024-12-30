import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI as string;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(connectionString, { dbName: "uber" });
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectMongoDB;
