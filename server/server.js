import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import donor from "./routes/donorRoute";
import careTaker from "./routes/careTakerRoute";
import student from "./routes/studentRoute";
import admin from "./routes/adminRoute";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", admin);
app.use("/api/v1", student);
app.use("/api/v1", donor);
app.use("/api/v1", careTaker);

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
