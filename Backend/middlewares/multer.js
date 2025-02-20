// import multer from "multer"

// const storage = multer.memoryStorage();
// export const multipleUpload = multer({ storage }).fields([
//   { name: "profilePhoto", maxCount: 1 },
//   // { name: "resume", maxCount: 1 }
// ]);

import multer from "multer";

const storage = multer.memoryStorage({}); // Store files temporarily before Cloudinary upload

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

export const multipleUpload = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "logo", maxCount: 1 }, // Add this line for company logo uploads
  {name :"photos",maxCount:5},
  // { name: "resume", maxCount: 1 }
]);

export const uploadVideo = multer({ storage }).single("video"); // Video Upload
