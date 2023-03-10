import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const donorSchema = new mongoose.Schema(
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
    },
    dateOfBirth: {
      type: Date,
      required: "Date of birth can't be empty",
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "not a valid email",
      },
      required: "email can't be empty",
    },
    password: {
      type: String,
      required: "password can't be empty",
      minlength: 5,
    },
    mobile: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Not a valid mobile no",
      },
      required: "mobile number can't be empty",
    },
    occupation: {
      type: String,
    },
    transactions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Transaction" }],
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

donorSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "donors",
});

donorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

donorSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

donorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

donorSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("Donor", donorSchema);
