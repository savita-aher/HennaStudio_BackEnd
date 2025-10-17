import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminModel from '../../models/AdminModel.mjs';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter admin email: ', (email) => {
  rl.question('Enter admin password: ', async (plainPassword) => {
    try {
      await mongoose.connect(process.env.MONGO_URI);

      const existing = await AdminModel.findOne({ email });
      if (existing) {
        console.log('⚠️ Admin already exists');
      } else {
        const passwordHash = await AdminModel.hashPassword(plainPassword);
        await AdminModel.create({ email, passwordHash });
        console.log('✅ Admin seeded successfully');
      }

      mongoose.disconnect();
      rl.close();
    } catch (err) {
      console.error('❌ Error seeding admin:', err.message);
      rl.close();
    }
  });
});