import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  category: {
    type: String,
    required: false,
    default: "general",
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "medium",
    required: false,
  },
  position: {
    type: String,
    enum: [
      "top-left",
      "top-right",
      "center",
      "bottom-left",
      "bottom-right",
      "middle-left",
      "middle-right",
    ],
    default: "center",
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
    required: false,
  },
  order: {
    type: Number,
    default: 0,
    required: false,
  },
  tags: {
    type: [String],
    default: [],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to update the updatedAt timestamp
gallerySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", gallerySchema);
