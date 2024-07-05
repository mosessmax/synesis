import express from 'express';
import Test from '../models/test.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

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
        let tests;
        if (req.user.role === 'admin') {
            tests = await Test.find();
        } else {
            tests = await Test.find({createdBy: req.user.id});
        }
        res.json(tests);
        // const tests = await Test.find({createdBy: req.user.id});
        // res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get available tests for students 
router.get('/available', auth, async (req, res) => {
    try {
        const tests = await Test.find({ isActive: true }).select('-questions');
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// get test by id route - getting a specific test

router.get('/:id', auth, async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// updating a test route (admin only )
router.put('/:id', [auth, isAdmin], async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        Object.assign(test, req.body);
        await test.save();
        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a test (Admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.json({ message: 'Test deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start a test
router.post('/:id/start', auth, async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        if (!test.isActive) {
            return res.status(400).json({ message: 'This test is not currently active' });
        }
        // Here you might want to create a TestSession or similar to track the user's progress
        res.json({
            testId: test._id,
            title: test.title,
            description: test.description,
            duration: test.duration,
            questions: test.questions.map(q => ({
                id: q._id,
                text: q.text,
                type: q.type,
                options: q.options
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// submit test answers
router.post('/:id/submit', auth, async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        // Here you would process the submitted answers, calculate the score, and save the results
        res.json({ message: 'Test submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;