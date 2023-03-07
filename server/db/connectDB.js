import mongoose from "mongoose";

const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log("Connected to db successfully!");
};

export default connectDB;
