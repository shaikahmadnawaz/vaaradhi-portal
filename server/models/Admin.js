import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can't be empty"],
  },
  image: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: "Not a valid URL",
    },
    required: [true, "Name can't be empty"],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "not a valid email",
    },
    required: [true, "Email can't be empty"],
  },
  password: {
    type: String,
    required: [true, "Password can't be empty"],
    minlength: 5,
  },
  mobile: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: "not a valid mobile number",
    },
    required: [true, "Moblie number can't be empty"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  console.log("password modified");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("Admin", adminSchema);
