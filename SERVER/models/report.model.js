import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true, unique: true },
  overallScore: { type: Number, required: true }, questionScores: [mongoose.Schema.Types.Mixed],
  strengths: [String], weaknesses: [String], technicalPerformance: String,
  communicationClarity: String, improvementTopics: [String], finalFeedback: String,
}, { timestamps: true })

export default mongoose.model('InterviewReport', ReportSchema)
