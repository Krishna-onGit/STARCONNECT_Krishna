// import multer from "multer"

// const storage = multer.memoryStorage();
// export const multipleUpload = multer({ storage }).fields([
//   { name: "profilePhoto", maxCount: 1 },
//   // { name: "resume", maxCount: 1 }
// ]);

import multer from "multer";

const storage = multer.memoryStorage({}); // Store files temporarily before Cloudinary upload

const fileFilter = (req, file, cb) => {
<<<<<<< HEAD
  const allowedMimeTypes = ["image/", "video/"];
  if (!allowedMimeTypes.some(type => file.mimetype.startsWith(type))) {
    return cb(new Error("Only image or video files are allowed!"), false);
=======
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
>>>>>>> c5951ef00c6fa84314ba065af448a8fb0e4533ec
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