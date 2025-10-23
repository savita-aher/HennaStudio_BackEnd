import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/AdminModel.mjs';
import { verifyToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Create new admin
router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newAdmin = new AdminModel({ email, passwordHash });
  await newAdmin.save();
  res.status(201).json({ message: 'Admin created' });
});

// Admin login with JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '15min',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email: admin.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Protected dashboard route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: 'Welcome to the admin dashboard',
    user: req.user,
  });
});

export default router;