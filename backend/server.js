import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/db.js';

// Load environment variables from .env file

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();



//body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path to our static folders
app.use(express.static(path.join(__dirname, 'public')));

// Logging using morgan middleware only if we are in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});