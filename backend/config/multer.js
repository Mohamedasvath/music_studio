import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";

// create uploads folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// allow audio + image
const fileFilter = (req, file, cb) => {

  const audioTypes = /mp3|wav|flac|webm/;
  const imageTypes = /jpg|jpeg|png|webp/;

  const ext = path.extname(file.originalname).toLowerCase();

  if (audioTypes.test(ext) || imageTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only audio or image files allowed!"));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter,
});