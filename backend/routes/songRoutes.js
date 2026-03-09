import express from "express";
import { upload } from "../config/multer.js";
import {
  uploadSong,
  getSongs,
  getSongById,
  deleteSong,
  createSong
} from "../controller/songController.js";

const router = express.Router();

router.post("/upload", upload.single("song"), uploadSong);

router.get("/", getSongs);
router.get("/:id", getSongById);
router.delete("/:id", deleteSong);
router.post("/", createSong);

export default router;