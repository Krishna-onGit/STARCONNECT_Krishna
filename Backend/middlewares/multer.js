// import multer from "multer"

// const storage = multer.memoryStorage();
// export const multipleUpload = multer({ storage }).fields([
//   { name: "profilePhoto", maxCount: 1 },
//   // { name: "resume", maxCount: 1 }
// ]);

import multer from "multer";

const storage = multer.memoryStorage({}); // Store files temporarily before Cloudinary upload

export const multipleUpload = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  // { name: "resume", maxCount: 1 }
]);

export const uploadVideo = multer({ storage }).single("video"); // Video Upload
