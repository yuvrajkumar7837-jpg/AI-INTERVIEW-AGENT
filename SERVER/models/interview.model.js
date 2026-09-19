import mongoose from 'mongoose'

const AnswerSchema = new mongoose.Schema({
  question: { type: String, required: true }, category: String, answer: { type: String, default: '' },
  evaluation: mongoose.Schema.Types.Mixed,
}, { _id: false })

const InterviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  questions: { type: [AnswerSchema], required: true },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
}, { timestamps: true })

export default mongoose.model('Interview', InterviewSchema)
