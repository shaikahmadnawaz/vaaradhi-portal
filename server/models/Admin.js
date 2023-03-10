import mongoose from "mongoose";
import validator from "validator";

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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


//Generating Password Reset Token
adminSchema.methods.getResetPasswordToken = function(){
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

export default mongoose.model("Admin", adminSchema);
