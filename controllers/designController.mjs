import HennaImage from "../models/HennaImage.mjs";

export const getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const images = await HennaImage.find({ category });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};