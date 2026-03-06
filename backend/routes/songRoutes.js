import express from "express";
import multer from "multer";
import {
  uploadSong,
  getSongs,
  getSongById,
  deleteSong,
  createSong
} from "../controller/songController.js";

const router = express.Router();


// Multer Storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});

const upload = multer({ storage });


// 🟢 Routes
router.post("/upload", upload.single("song"), uploadSong);
router.get("/", getSongs);
router.get("/:id", getSongById);
router.delete("/:id", deleteSong);
router.post("/", createSong);

export default router;
