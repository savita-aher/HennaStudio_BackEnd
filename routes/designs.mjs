import express from 'express';
import Image from '../models/ImageModel.mjs';
import '../middleware/errorHandler.mjs';

const router = express.Router();

// ✅ Get all designs
router.get('/all', async (req, res, next) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

// ✅ Update design by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      const error = new Error('Design not found');
      error.status = 404;
      return next(error);
    }
    res.json(updated);
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

// ✅ Delete design by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Image.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error('Design not found');
      error.status = 404;
      return next(error);
    }
    res.json({ success: true });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

export default router;