import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "not a valid email",
    },
  },
  password: {
    type: String,
    required: "Date of birth can't be empty",
    minlength: 5,
  },
  mobile: {
    type: Number,
    validate: {
      validator: validator.isMobilePhone,
      message: "not a valid email",
    },
  },
});

export default mongoose.model("Admin", adminSchema);
