import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

/**
 * Uploads buffer-based files to Cloudinary (used for memoryStorage in multer)
 * @param {Buffer} buffer - The file buffer
 * @param {String} folder - The Cloudinary folder where the file will be stored
 * @param {String} resourceType - The type of resource (e.g., "image", "video")
 * @returns {Promise<Object>} - The upload result from Cloudinary
 */

export const uploadToCloudinary = (buffer, folder, resourceType) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };
  
  export default cloudinary;