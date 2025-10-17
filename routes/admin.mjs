import express from 'express';
import bcrypt from 'bcrypt';
import AdminModel from '../models/AdminModel.mjs';

const router = express.Router();
router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newAdmin = new AdminModel({ email, passwordHash });
  await newAdmin.save();
  res.status(201).json({ message: 'Admin created' });
});

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

    res.status(200).json({
      message: 'Login successful',
      redirectTo: '/admin/dashboard',
      admin: { email: admin.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;