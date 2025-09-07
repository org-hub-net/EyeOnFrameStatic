import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// αρχικοποίηση
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadLargeVideo() {
  try {
    const result = await cloudinary.uploader.upload_large(
      "newMedia/Shooting_official.mp4",
      {
        resource_type: "video",
        chunk_size: 6000000, // 6MB chunks
      }
    );
    console.log("Upload successful:", result.secure_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

uploadLargeVideo();
