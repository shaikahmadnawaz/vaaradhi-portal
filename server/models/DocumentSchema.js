import mongoose from "mongoose";
import validator from "validator";
const DocumentSchema = new mongoose.Schema({
  name : String,
  url: {
      type: String,
      validate: { validator: validator.isURL, message: "Not a valid URL" },
    }
});
export default mongoose.model("Document", DocumentSchema);