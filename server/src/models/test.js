import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ['multiple_choice', 'true_false', 'short_answer'], required: true },
    options: [String],
    correctAnswer: { type: String, required: true },
});

const testSchemea = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String,},
    duration: { type: Number, required: true }, //minutes 
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Test', testSchemea);