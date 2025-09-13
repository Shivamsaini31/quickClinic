import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    // console.log("Connected with server");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;
