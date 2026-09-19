import Resume from '../models/resume.model.js'
import Interview from '../models/interview.model.js'
import InterviewReport from '../models/report.model.js'
import { extractPdfText, extractResumeData } from '../services/resume.service.js'
import { chatCompletionJson } from '../services/openRouter.service.js'

export const uploadResume = async (req, res) => {
  if (!req.file || req.file.mimetype !== 'application/pdf') return res.status(400).json({ message: 'Only PDF resumes are supported' })
  const text = await extractPdfText(req.file.buffer)
  if (!text) return res.status(422).json({ message: 'Could not extract text from this PDF' })
  const extractedData = await extractResumeData(text)
  return res.status(201).json(await Resume.create({ user: req.userId, filename: req.file.originalname, text, extractedData }))
}

export const listResumes = async (req, res) => res.json(await Resume.find({ user: req.userId }).select('-text').sort({ createdAt: -1 }))

export const getResume = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.userId }).select('-text')
  if (!resume) return res.status(404).json({ message: 'Resume not found' })
  return res.json(resume)
}

export const createInterview = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.body.resumeId, user: req.userId })
  if (!resume) return res.status(404).json({ message: 'Resume not found' })
  const { json } = await chatCompletionJson({
    messages: [
      { role: 'system', content: 'Create a personalized interview from only the supplied resume. Return JSON with questions: an array of 8 objects with question and category. Categories: project, technical, conceptual, behavioral. Never invent resume facts.' },
      { role: 'user', content: JSON.stringify(resume.extractedData) },
    ],
  })
  const questions = Array.isArray(json.questions)
    ? json.questions.filter((q) => typeof q?.question === 'string').slice(0, 12).map((q) => ({ question: q.question, category: q.category || 'technical' }))
    : []
  if (!questions.length) return res.status(502).json({ message: 'AI returned no valid interview questions' })
  return res.status(201).json(await Interview.create({ user: req.userId, resume: resume._id, questions }))
}

export const listInterviews = async (req, res) => res.json(await Interview.find({ user: req.userId }).select('-questions.answer -questions.evaluation').sort({ createdAt: -1 }))

export const getInterview = async (req, res) => {
  const interview = await Interview.findOne({ _id: req.params.id, user: req.userId })
  if (!interview) return res.status(404).json({ message: 'Interview not found' })
  return res.json(interview)
}

export const submitAnswer = async (req, res) => {
  const interview = await Interview.findOne({ _id: req.params.id, user: req.userId })
  const index = Number(req.body.questionIndex)
  const answer = typeof req.body.answer === 'string' ? req.body.answer.trim() : ''
  if (!interview || interview.status === 'completed') return res.status(404).json({ message: 'Active interview not found' })
  if (!Number.isInteger(index) || !interview.questions[index] || !answer) return res.status(400).json({ message: 'Valid questionIndex and answer are required' })
  const { json } = await chatCompletionJson({
    messages: [
      { role: 'system', content: 'Evaluate the answer. Return JSON with correctness, relevance, technicalUnderstanding, clarity, completeness as numbers 0-10, plus feedback and improvement.' },
      { role: 'user', content: JSON.stringify({ question: interview.questions[index].question, answer }) },
    ],
  })
  interview.questions[index].answer = answer
  interview.questions[index].evaluation = {
    correctness: Number(json.correctness) || 0, relevance: Number(json.relevance) || 0,
    technicalUnderstanding: Number(json.technicalUnderstanding) || 0, clarity: Number(json.clarity) || 0,
    completeness: Number(json.completeness) || 0, feedback: String(json.feedback || ''), improvement: String(json.improvement || ''),
  }
  await interview.save()
  return res.json({ question: interview.questions[index] })
}

export const completeInterview = async (req, res) => {
  const interview = await Interview.findOne({ _id: req.params.id, user: req.userId })
  if (!interview) return res.status(404).json({ message: 'Interview not found' })
  if (interview.questions.some((question) => !question.answer || !question.evaluation)) return res.status(400).json({ message: 'Answer every question before completing the interview' })
  const { json } = await chatCompletionJson({
    messages: [
      { role: 'system', content: 'Create a concise final interview report as JSON. Keys: overallScore (0-100), questionScores (array), strengths (array), weaknesses (array), technicalPerformance, communicationClarity, improvementTopics (array), finalFeedback.' },
      { role: 'user', content: JSON.stringify(interview.questions) },
    ],
  })
  interview.status = 'completed'
  await interview.save()
  const reportData = {
    overallScore: Math.max(0, Math.min(100, Number(json.overallScore) || 0)),
    questionScores: Array.isArray(json.questionScores) ? json.questionScores : interview.questions.map((q) => q.evaluation),
    strengths: Array.isArray(json.strengths) ? json.strengths.filter((x) => typeof x === 'string') : [],
    weaknesses: Array.isArray(json.weaknesses) ? json.weaknesses.filter((x) => typeof x === 'string') : [],
    technicalPerformance: String(json.technicalPerformance || ''), communicationClarity: String(json.communicationClarity || ''),
    improvementTopics: Array.isArray(json.improvementTopics) ? json.improvementTopics.filter((x) => typeof x === 'string') : [],
    finalFeedback: String(json.finalFeedback || ''),
  }
  return res.json(await InterviewReport.findOneAndUpdate(
    { interview: interview._id, user: req.userId }, { ...reportData, interview: interview._id, user: req.userId }, { upsert: true, new: true },
  ))
}

export const getReport = async (req, res) => {
  const report = await InterviewReport.findOne({ _id: req.params.id, user: req.userId })
  if (!report) return res.status(404).json({ message: 'Report not found' })
  return res.json(report)
}
