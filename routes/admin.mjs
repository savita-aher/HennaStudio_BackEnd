import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/AdminModel.mjs';
import { verifyToken } from '../middleware/authMiddleware.mjs';
import '../middleware/errorHandler.mjs';

const router = express.Router();

// Create new admin
router.post('/create', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      const error = new Error('Admin with this email already exists');
      error.status = 409;
      return next(error);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({ email, passwordHash });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    next(err);
  }
});

// Admin login with JWT
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '15min' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email: admin.email },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/test', (req, res) => {
  res.send('Admin route is working');
});

// Protected dashboard route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: 'Welcome to the admin dashboard',
    user: req.user,
  });
});

export default router;