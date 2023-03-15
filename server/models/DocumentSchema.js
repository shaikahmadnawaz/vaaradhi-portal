import mongoose from "mongoose";
import validator from "validator";
const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Document title can't be empty"],
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Student",
    required: [true, "Provide student details"],
  },
  url: {
    type: String,
    validate: { validator: validator.isURL, message: "Not a valid URL" },
  },
});
export default mongoose.model("Document", DocumentSchema);
