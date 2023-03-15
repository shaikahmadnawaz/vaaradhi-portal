import mongoose from "mongoose";
import validator from "validator";
const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "provide title"],
  },
  description: {
    type: String,
    required: [true, "provide description"],
  },
  category: {
    type: String,
    enum: ["workshop", "competition", "exam report", "other"],
    required: [true, "provide category"]
  },
  photos: [
    {
      type: String,
      validate: { validator: validator.isURL, message: "Not a valid URL" },
    },
  ],
});

export default mongoose.model("Activity", ActivitySchema);