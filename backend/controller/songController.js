import Song from "../models/Song.js";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";

// 🎵 Allowed Categories
const allowedCategories = [
  "Love",
  "Sad",
  "Melody",
  "HipHop",
  "Rap",
  "Folk",
  "Devotional",
  "Honey Track",
  "Other"
];

// ⏱ Get Audio Duration
const getAudioDuration = (filePath) => {
  return new Promise((resolve) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return resolve(0);
      resolve(metadata?.format?.duration || 0);
    });
  });
};



/* =========================================================
   UPLOAD SONG (FILE UPLOAD – RECORD / GALLERY)
========================================================= */
export const uploadSong = async (req, res) => {
  try {

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No audio file uploaded"
      });
    }

    // 🌐 file url
    const fileUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;

    // ⏱ duration
    const duration = await getAudioDuration(file.path);

    // 🧠 sanitize category
    const category = allowedCategories.includes(req.body.category)
      ? req.body.category
      : "Other";

    // 🧾 create song
    const newSong = await Song.create({
      title: req.body.title || file.originalname,
      description: req.body.description || "",
      category,
      artist: req.body.artist || "Unknown",
      type: req.body.type || "uploaded",
      fileUrl,
      fileSize: file.size,
      duration,
      thumbnail: req.body.thumbnail || ""
    });

    return res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      song: newSong
    });

  } catch (error) {

    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message
    });
  }
};



/* =========================================================
   CREATE SONG (JSON ONLY – NO FILE)
========================================================= */
export const createSong = async (req, res) => {
  try {

    const category = allowedCategories.includes(req.body.category)
      ? req.body.category
      : "Other";

    const song = await Song.create({
      ...req.body,
      category
    });

    return res.status(201).json({
      success: true,
      message: "Song added successfully",
      song
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* =========================================================
   GET ALL SONGS
========================================================= */
export const getSongs = async (req, res) => {
  try {

    const songs = await Song.find().sort({ createdAt: -1 });

    return res.status(200).json(songs);

  } catch (error) {

    return res.status(500).json({
      message: "Failed to fetch songs"
    });
  }
};



/* =========================================================
   GET SINGLE SONG
========================================================= */
export const getSongById = async (req, res) => {
  try {

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        message: "Song not found"
      });
    }

    return res.status(200).json(song);

  } catch (error) {

    return res.status(500).json({
      message: "Failed to fetch song"
    });
  }
};



/* =========================================================
   DELETE SONG (FILE + DB)
========================================================= */
export const deleteSong = async (req, res) => {
  try {

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        message: "Song not found"
      });
    }

    // 🗑 delete audio file
    if (song.fileUrl?.includes("/uploads/")) {

      const fileName = song.fileUrl.split("/uploads/")[1];

      const filePath = path.join(process.cwd(), "uploads", fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await song.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Song deleted successfully"
    });

  } catch (error) {

    console.error("DELETE ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete song"
    });
  }
};