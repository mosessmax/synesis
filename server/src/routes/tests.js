import express from 'express';
import Test from '../models/test.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import TestSubmission from '../models/testSubmission.js';


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
// check is there's an existing session 
let testSession = await TestSession.findOne({ 
    test: test._id,
    user: req.user._id,
    isCompleted: false });

    if (!testSession) {
        testSession = new TestSession({
            test: test._id,
            user: req.user._id
        });

        await testSession.save();

        session = new TestSession({
            test: test._id,
            user: req.user._id
        });
        await session.save();
    }

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

        const { answers } = req.body;
        
        // Calculate score
        let score = 0;
        const submissionAnswers = [];
        
        for (const answer of answers) {
            const question = test.questions.id(answer.questionId);
            if (question && question.correctAnswer === answer.answer) {
                score++;
            }
            submissionAnswers.push({
                questionId: answer.questionId,
                answer: answer.answer
            });
        }

        const percentage = (score / test.questions.length) * 100;
        const passed = percentage >= test.passingScore;

        // Create submission
        const submission = new TestSubmission({
            test: test._id,
            user: req.user._id,
            answers: submissionAnswers,
            score: percentage,
            passed
        });

        await submission.save();

        res.json({
            message: 'Test submitted successfully',
            score: percentage,
            passed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;