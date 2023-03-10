import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const careTakerSchema = new mongoose.Schema(
  {
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
      required: [true, "Image can't be empty"],
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
      required: [true, "email can't be empty"],
      unique: true,
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
      required: [true, "mobile number can't be empty"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

careTakerSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "careTaker",
});

careTakerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

careTakerSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

careTakerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

careTakerSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("Caretaker", careTakerSchema);
