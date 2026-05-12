import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log("Connect with the database successfully!");
  } catch (error) {
    console.error("Database connetion error: ", error);
    process.exit(1); // exit with failure
  }
};
