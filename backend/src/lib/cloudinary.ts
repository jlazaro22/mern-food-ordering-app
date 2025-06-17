import { v2 as cloudinary } from 'cloudinary';

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || undefined;
const api_key = process.env.CLOUDINARY_API_KEY || undefined;
const api_secret = process.env.CLOUDINARY_API_SECRET || undefined;

if (!cloud_name || !api_key || !api_secret) {
  throw new Error(`Missing some CLOUDINARY environment variables.`);
}

export default function cloudinaryConfig() {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}
