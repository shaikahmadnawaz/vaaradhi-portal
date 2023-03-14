import mongoose from "mongoose";
const ActivitySchema = new mongoose.Schema({
    title: String,
    description: String,
    category: {
        type: String,
        enum: ["workshop", "competition", "exam report", "other"],
    },
    photos: [
        {
        type: String,
        validate: { validator: validator.isURL, message: "Not a valid URL" },
        },
    ],
});

export default mongoose.model("Activity", ActivitySchema);