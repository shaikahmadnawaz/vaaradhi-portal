import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { adminRouter } from "./routes/index.js";
import Admin from "./models/Admin.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/admin", adminRouter);
// app.use("/api/student", student);
// app.use("/api/donor", donor);
// app.use("/api/caretaker", careTaker);

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

// const test = async () => {
//   try {
//     const admin = await Admin.create({
//       name: "admin",
//       image: "https://picsum.photos/200",
//       email: "admin@gmail.com",
//       password: "secret",
//       mobile: "9123456780",
//     });
//     console.log(admin);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

start();
// test();
