import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
