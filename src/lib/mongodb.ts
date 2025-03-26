import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: "majority",
    });

    console.log("Connection to MongoDB established");
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;