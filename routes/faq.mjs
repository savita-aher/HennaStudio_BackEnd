// routes/questions.js
import express from 'express';
import Question from '../models/FAQModel.mjs';

const router = express.Router();

// GET all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// POST new question (optional for admin use)
router.post('/', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newQuestion = new Question({ question, answer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save question' });
  }
});

export default router;