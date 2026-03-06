import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

   category: {
  type: String,
  enum: [
    "Love",
    "Sad",
    "Melody",
    "HipHop",
    "Rap",
    "Folk",
    "Devotional",
    "Honey Track",
    "Other"
  ],
  default: "Other",
},
    type: {
      type: String,
      enum: ["recorded", "uploaded", "gallery"],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number, // bytes
      default: 0,
    },

    duration: {
      type: Number, // seconds
      default: 0,
    },

    thumbnail: {
      type: String,
      default: "", // optional preview image
    },

    artist: {
      type: String,
      default: "Unknown",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
