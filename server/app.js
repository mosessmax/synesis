import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';
import protectedRoutes from './src/routes/protected.js';
import testRoutes from './src/routes/tests.js';
import { errorHandler } from './src/utils/errorHandling.js';
// import { errorHandler } from './src/models/utils/errorHandling.js';


dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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