// routes/questions.js
import express from 'express';
import FAQ from '../models/FAQModel.mjs';
import FAQModel from '../models/FAQModel.mjs';


const router = express.Router();

// GET all questions
router.get('/', async (req, res) => {
  try {
    const questions = await FAQModel.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// POST new question (optional for admin use)
router.post('/', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newQuestion = new FAQModel({ question, answer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save question' });
  }
});
router.get('/test', (req, res) => {
  res.send('FAQ route is working!');
});


export default router;