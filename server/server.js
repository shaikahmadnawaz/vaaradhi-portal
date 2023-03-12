import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { adminRouter } from "./routes/index.js";

dotenv.config({path:'./config/.env'});
const app = express();
app.use(express.json());

app.use("/api/admin", adminRouter);

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

