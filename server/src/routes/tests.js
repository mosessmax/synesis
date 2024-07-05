import express from 'express';
import Test from '../models/test.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// new test route
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, duration, questions } = req.body;
        const newTest = new Test({
            title,
            description,
            duration,
            questions,
            createdBy: req.user.id
        });
        const savedTest = await newTest.save();
        res.status(201).json(savedTest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get all tests route
router.get('/', auth, async (req, res) => {
    try {
        const tests = await Test.find({createdBy: req.user.id});
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;