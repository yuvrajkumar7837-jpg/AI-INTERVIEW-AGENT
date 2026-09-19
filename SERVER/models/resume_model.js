import mongoose from 'mongoose'
const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  filename: { type: String, required: true, maxlength: 255 },
  mimeType: { type: String, required: true },
  text: { type: String, required: true, maxlength: 100000 },
}, { timestamps: true })
export default mongoose.model('Resume', ResumeSchema)
