import mongoose from 'mongoose'
const EvaluationSchema = new mongoose.Schema({
  question: { type: String, required: true }, answer: { type: String, required: true },
  score: { type: Number, min: 0, max: 100 }, feedback: String, strengths: [String], improvements: [String],
}, { _id: false })
const InterviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  questions: [{ type: String, required: true }], answers: [EvaluationSchema],
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  report: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: true })
export default mongoose.model('Interview', InterviewSchema)
