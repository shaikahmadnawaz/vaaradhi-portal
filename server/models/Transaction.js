import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  donor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Donor",
    required: "donor can't be empty",
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Student",
    required: "student can't be empty",
  },
  date: {
    type: Date,
    required: "date can't be empty",
  },
  amount: {
    type: Number,
    required: "amount can't be empty",
  },
});

export default mongoose.model("Transaction", transactionSchema);
