import mongoose from "mongoose";
import validator from "validator";

const donorSchema = new mongoose.Schema({
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
  },
  occupation: {
    type: String,
  },
  students: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Student" }],
  transactions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Transaction" }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


//Generating Password Reset Token
donorSchema.methods.getResetPasswordToken = function(){
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

export default mongoose.model("Donor", donorSchema);
