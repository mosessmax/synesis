import mongoose from "mongoose";

const answerSchema = new mongoose.Scheme({
    questionId: {type: mongoose.Schema.Types.ObjectId, required: true},
    answer: {type:String, required: true}
});

const testSubmissionSchema = new mongoose.Schema ({
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [answerSchema],
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('TestSubmission', testSubmissionSchema);