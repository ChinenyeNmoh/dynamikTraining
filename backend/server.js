import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoute.js';
import moduleRoutes from './routes/moduleRoute.js';
import cookieParser from 'cookie-parser';


// Load environment variables from .env file
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();



//body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // To parse cookies in requests


// Define __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path to our static folders
app.use(express.static(path.join(__dirname, 'public')));

// Routes handlers
app.use('/api/users', userRoutes);

app.use('/api/modules', moduleRoutes);


app.get('/api/captcha', (req, res) =>
  res.send({ clientId: process.env.CLIENT_CAPTCHA })
);


// error handling middleware
app.use(notFound);
app.use(errorHandler);

// Logging using morgan middleware only if we are in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});