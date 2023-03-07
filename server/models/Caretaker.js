import mongoose from "mongoose";
import validator from "validator";

const careTakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name can't be empty",
  },
  image: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: "Not a valid URL",
    },
  },
  dateOfBirth: {
    type: Date,
    required: "Date of birth can't be empty",
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "not a valid email",
    },
    required: "email can't be empty",
  },
  password: {
    type: String,
    required: "Date of birth can't be empty",
    minlength: 5,
  },
  mobile: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: "not a valid email",
    },
    required: "mobile can't be empty",
  },
  students: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Student" }],
});

export default mongoose.model("Caretaker", careTakerSchema);
