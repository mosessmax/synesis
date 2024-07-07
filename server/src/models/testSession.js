import mongoose from "mongoose";

const testSessionSchema = new mongoose.Schema({
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    isCompleted: { type: Boolean, default: false },
    currentQuestion: { type: Number, default: 0 },
    answers: [{
        questionId: mongoose.Schema.Types.ObjectId,
        answer: String
    }]
});

testSessionSchema.methods.isTimeUp = function() {
    const test = this.test;
    const currentTime = new Date();
    return (currentTime - this.startTime) / 60000 >= test.duration;
};

export default mongoose.model('TestSession', testSessionSchema);