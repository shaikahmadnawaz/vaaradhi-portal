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
    required: "Password can't be empty",
    minlength: 5,
  },
  mobile: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: "not a valid mobile number",
    },
    required: "mobile number can't be empty",
  },
  students: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Student" }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


//Generating Password Reset Token
careTakerSchema.methods.getResetPasswordToken = function(){
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //hashing and adding to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
} 


export default mongoose.model("Caretaker", careTakerSchema);
