import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, matricNumber } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { matricNumber }] });
    if (existingUser) {
      return res.status(400).send('User already exists with the given email or matric number.');
    }
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      matricNumber,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { matricNumber, email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ $or: [{ email }, { matricNumber }] });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials for U' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials for P' });
    }


    // //check for date of birth
    // const providedDOB = new Date(dateOfBirth);
    // if (providedDOB.toDateString() !== user.dateOfBirth.toDateString()) {
    //   return res.status(400).json({ message: 'Invalid credentials for D' });
    // }

    // Create and send token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
