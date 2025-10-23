// uploadMiddleware.mjs
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../controllers/cloudinaryConfig.mjs';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hennaBloom', // optional folder name
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });
export default upload;