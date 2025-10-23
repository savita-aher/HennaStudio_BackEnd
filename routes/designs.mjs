import express from 'express';
import Image from '../models/ImageModel.mjs';

const router = express.Router();

// ✅ Get all designs
router.get('/all', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});

// ✅ Update design by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update design' });
  }
});

// ✅ Delete design by ID (optional)
router.delete('/:id', async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete design' });
  }
});

export default router;