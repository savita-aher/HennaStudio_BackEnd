//  Imports
import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from "cors";
import connectDB from "./db/conn.mjs";
import contactRoutes from "./routes/contact.mjs";
import FAQRoutes from "./routes/faq.mjs";
import AdminRoutes from "./routes/admin.mjs"
import imageUploadRoute from './routes/imageUpload.mjs';
import designsRoutes from './routes/designs.mjs';
import errorHandler from './middleware/errorHandler.mjs';

//  Setup
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//  DB Connection
connectDB();

//  Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://hennastudio-frontend.onrender.com'],
  credentials: true
}));


//routes
app.get('/', (req, res) => {
  res.send('HennaBloom backend is live');
});
app.use("/api/contact", contactRoutes);
app.use("/api/faq",FAQRoutes);
app.use("/api/admin",AdminRoutes);
app.use('/api/images', imageUploadRoute);
app.use('/api/designs', designsRoutes);

// Global Error Handler 
app.use(errorHandler);

//  Listener
app.listen(PORT, () => {
  console.log(`HennaBloom backend running on PORT: ${PORT}`);
});