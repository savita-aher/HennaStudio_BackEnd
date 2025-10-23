// routes/imageUpload.mjs
import express from 'express';
import upload from '../middleware/uploadMiddleware.mjs';
import ImageModel from '../models/ImageModel.mjs';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new ImageModel({
      category: req.body.category,
      imageUrl: req.file.path, // Cloudinary public URL
      price: req.body.price,
      styleTag: req.body.styleTag
    });

    await newImage.save();
    res.json({ message: 'Image uploaded!', image: newImage });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const images = await ImageModel.find({ category: req.params.category.toLowerCase() });
    res.json(images);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

export default router;