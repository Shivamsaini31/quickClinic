import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DB_URL || process.env.MONGODB_URI;
    if (!dbUrl) {
      throw new Error("Database URL not found in environment variables");
    }
    await mongoose.connect(dbUrl);
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process if database connection fails
  }
};

export default connectDB;
