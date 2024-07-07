// src/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import authRoutes from './routes/auth.js';
// import protectedRoutes from './routes/protected.js';

import authRoutes from './src/routes/auth.js';
import protectedRoutes from './src/routes/protected.js';
import testRoutes from './src/routes/tests.js';
import { errorHandler } from './utils/errorHandling.js';


dotenv.config();

const app = express();

app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// ROUTES 
  // Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the CBT API' });
});

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/tests', testRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));