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

export async function uploadImage(imageFile: Express.Multer.File) {
  const base64Image = Buffer.from(imageFile.buffer).toString('base64');
  let dataURI = `data:${imageFile.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.uploader.upload(dataURI);

  return uploadResponse.url;
}
