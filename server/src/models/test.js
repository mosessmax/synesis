import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ['multiple_choice', 'true_false', 'short_answer'], required: true },
    options: [String],
    correctAnswer: { type: String, required: true },
});

const testSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String,},
    duration: { type: Number, required: true }, //minutes 
    passingScore: { type: Number, required: true, min: 0, max: 100},
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isActive: { type: Boolean, default:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

testSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('Test', testSchema);