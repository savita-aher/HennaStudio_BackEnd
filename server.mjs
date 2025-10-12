//  Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/conn.mjs";

//  Setup
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

//  DB Connection
connectDB();

//  Middleware
app.use(express.json());
app.use(cors());

//  Listener
app.listen(PORT, () => {
  console.log(`HennaBloom backend running on PORT: ${PORT}`);
});