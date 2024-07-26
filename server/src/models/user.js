import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  matricNumber: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true }, 
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);