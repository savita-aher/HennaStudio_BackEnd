//  Imports
import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from "cors";
import connectDB from "./db/conn.mjs";
import contactRoutes from "./routes/contact.mjs";
import QuestionRoutes from "./routes/faq.mjs";


//  Setup
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//  DB Connection
connectDB();

//  Middleware
app.use(express.json());
app.use(cors());

//routes
//SAVE ALL Data to MongoDb
app.use("/api/contact", contactRoutes);
app.use("/api/FAQ",QuestionRoutes)


//  Listener
app.listen(PORT, () => {
  console.log(`HennaBloom backend running on PORT: ${PORT}`);
});