import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const validVideoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];

const uploadFolder = async (localFolder) => {
  const files = fs.readdirSync(localFolder);

  for (const file of files) {
    const fullPath = path.join(localFolder, file);
    const ext = path.extname(file).toLowerCase();

    if (fs.statSync(fullPath).isFile()) {
      let resourceType = null;

      if (validImageExtensions.includes(ext)) {
        resourceType = 'image';
      } else if (validVideoExtensions.includes(ext)) {
        resourceType = 'video';
      } else {
        console.log(`⏭ Skipping unsupported file type: ${file}`);
        continue; // πάμε στο επόμενο αρχείο
      }

      console.log(`🔼 Uploading ${file} to ${localFolder}`);

      await cloudinary.uploader.upload(fullPath, {
        folder: localFolder, // ανεβάζει στο cloudinary με το ίδιο όνομα folder (images ή media)
        resource_type: resourceType,
        use_filename: true,
        unique_filename: false,
        overwrite: true
      });
    }
  }
};

const main = async () => {
  try {
    await uploadFolder('images');
    await uploadFolder('media');

    console.log('✅ All files uploaded successfully!');
  } catch (err) {
    console.error('❌ Upload failed:', err);
  }
};

main();
 