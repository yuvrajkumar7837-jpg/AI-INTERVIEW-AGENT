import mongoose from 'mongoose'

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  filename: { type: String, required: true },
  text: { type: String, required: true },
  extractedData: {
    name: String, education: [String], skills: [String], experience: [String],
    projects: [String], internships: [String], technologies: [String], certifications: [String],
  },
}, { timestamps: true })

export default mongoose.model('Resume', ResumeSchema)
