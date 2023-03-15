import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema(
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
      required: "image can't be empty",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    aadhar: {
      type: Number,
      required: "Aadhar Number can't be empty",
      minlength: 12,
      maxlength: 12,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: "Date of birth can't be empty",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: "Gender can't be empty",
    },
    mother: {
      name: String,
      occupation: String,
    },
    father: {
      name: String,
      occupation: String,
    },
    guardian: {
      name: String,
      occupation: String,
    },
    careTaker: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Caretaker",
    },
    donors: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Donor",
      },
    ],
    category: {
      type: String,
      enum: ["orphan", "semi orphan", "poor student"],
      required: "category can't be empty",
    },
    education: {
      institution: {
        type: String,
        required: "institution can't be empty",
      },
      level: {
        type: String,
        enum: ["school", "intermediate", "ug"],
        required: "level can't be empty",
      },
      class: {
        type: Number,
        required: "class can't be empty",
      },
    },
    previousCaretakers: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Caretaker" },
    ],
    previousDonors: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Donor" }],
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

studentSchema.virtual("activities", {
  ref: "Activity",
  localField: "_id",
  foreignField: "student",
});

studentSchema.virtual("documents", {
  ref: "Document",
  localField: "_id",
  foreignField: "student",
});

export default mongoose.model("Student", studentSchema);
