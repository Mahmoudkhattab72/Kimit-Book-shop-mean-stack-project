const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Absolute path, so it does not depend on where the server is started from.
// Must match the folder served in app.js ("/user-images").
const UPLOAD_DIR = path.join(__dirname, "..", "upload");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Allow-list of mime types and the file extension we store them with
const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (request, file, cb) => cb(null, UPLOAD_DIR),
  filename: (request, file, cb) => {
    const newFileName = `${uuidv4()}.${ALLOWED_TYPES[file.mimetype]}`;
    request.newFileName = newFileName; // read later by the controller
    cb(null, newFileName);
  },
});

const fileFilter = (request, file, cb) => {
  if (!ALLOWED_TYPES[file.mimetype]) {
    return cb(new Error("Only JPEG, PNG, WEBP and GIF images are allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

// Wraps multer so every upload problem (wrong type, file too large)
// is returned as a 400 instead of a generic 500.
const uploadUserPhoto = (request, response, next) => {
  upload.single("userPhoto")(request, response, (error) => {
    if (error) error.status = 400;
    next(error);
  });
};

module.exports = { uploadUserPhoto };