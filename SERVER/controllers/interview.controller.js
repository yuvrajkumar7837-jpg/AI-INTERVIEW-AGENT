import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import Resume from '../models/resume_model.js'
import Interview from '../models/interview_model.js'
import { chatCompletionJson } from '../services/openRouter.service.js'

const parse = (value) => {
  if (typeof value !== 'string') return value
  const match = value.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
  return JSON.parse(match ? match[0] : value)
}
const fail = (message, status = 400) => Object.assign(new Error(message), { status })
const extractPdfText = async (buffer) => {
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer), useWorkerFetch: false, isEvalSupported: false }).promise
  const pages = []
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const content = await (await pdf.getPage(i)).getTextContent()
    pages.push(content.items.map((item) => item.str).join(' '))
  }
  return pages.join('\n').replace(/\s+/g, ' ').trim()
}

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file?.buffer) throw fail('A PDF resume is required')
    const text = await extractPdfText(req.file.buffer)
    if (text.length < 20) throw fail('The PDF does not contain readable text')
    const resume = await Resume.create({ user: req.userId, filename: req.file.originalname, mimeType: req.file.mimetype, text })
    return res.status(201).json({ resume: { _id: resume._id, filename: resume.filename, createdAt: resume.createdAt } })
  } catch (err) { return next(err) }
}

export const createInterview = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.body.resumeId, user: req.userId })
    if (!resume) throw fail('Resume not found', 404)
    const result = await chatCompletionJson({ messages: [
      { role: 'system', content: 'Create a technical interview from this resume. Return JSON only: {"questions":["..."]}; exactly 5 distinct questions.' },
      { role: 'user', content: resume.text.slice(0, 50000) },
    ], temperature: 0.5 })
    const questions = parse(result.json)?.questions
    if (!Array.isArray(questions) || !questions.length) throw fail('AI generated no questions', 502)
    const interview = await Interview.create({ user: req.userId, resume: resume._id, questions: questions.slice(0, 10).map(String) })
    return res.status(201).json({ ...interview.toObject(), currentQuestion: interview.questions[0] })
  } catch (err) { return next(err) }
}

export const submitAnswer = async (req, res, next) => {
  try {
    const answer = typeof req.body.answer === 'string' ? req.body.answer.trim() : ''
    if (!answer || answer.length > 10000) throw fail('Answer must be between 1 and 10000 characters')
    const interview = await Interview.findOne({ _id: req.params.id, user: req.userId })
    if (!interview) throw fail('Interview not found', 404)
    if (interview.status === 'completed') throw fail('Interview is already completed')
    const question = interview.questions[interview.answers.length]
    const result = await chatCompletionJson({ messages: [
      { role: 'system', content: 'Evaluate this answer. Return JSON only with score (0-100), feedback (string), strengths (array), improvements (array).' },
      { role: 'user', content: JSON.stringify({ question, answer }) },
    ], temperature: 0.2 })
    const evaluation = parse(result.json) || {}
    const item = { question, answer, score: Math.max(0, Math.min(100, Number(evaluation.score) || 0)), feedback: String(evaluation.feedback || ''), strengths: Array.isArray(evaluation.strengths) ? evaluation.strengths.map(String) : [], improvements: Array.isArray(evaluation.improvements) ? evaluation.improvements.map(String) : [] }
    interview.answers.push(item)
    if (interview.answers.length >= interview.questions.length) {
      interview.status = 'completed'
      const scores = interview.answers.map((entry) => entry.score)
      const strengths = [...new Set(interview.answers.flatMap((entry) => entry.strengths || []))]
      const improvements = [...new Set(interview.answers.flatMap((entry) => entry.improvements || []))]
      interview.report = {
        questionScores: interview.answers,
        overallScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        strengths,
        weaknesses: improvements,
        improvementAreas: improvements,
        technicalPerformance: 'Technical understanding is reflected in the question-wise scores and feedback.',
        communication: 'Communication was assessed for clarity and completeness in each answer.',
        topicsToStudy: improvements,
        finalFeedback: 'Review the question-wise feedback and practice the improvement areas before your next interview.',
        completedAt: new Date(),
      }
      await interview.save()
      return res.json({ status: 'completed', report: interview.report, ...interview.toObject() })
    }
    await interview.save()
    return res.json({ status: 'in_progress', evaluation: item, currentQuestion: interview.questions[interview.answers.length], answered: interview.answers.length, total: interview.questions.length })
  } catch (err) { return next(err) }
}

export const getInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.userId })
    if (!interview) throw fail('Interview not found', 404)
    return res.json(interview)
  } catch (err) { return next(err) }
}

export const getReport = async (req, res, next) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.userId })
    if (!interview) throw fail('Interview not found', 404)
    if (interview.status !== 'completed' || !interview.report) throw fail('Interview is not completed', 409)
    return res.json(interview.report)
  } catch (err) { return next(err) }
}

export const completeInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.userId })
    if (!interview) throw fail('Interview not found', 404)
    if (interview.status !== 'completed' || !interview.report) throw fail('Answer all questions before completing the interview', 409)
    return res.json({ status: 'completed', report: interview.report })
  } catch (err) { return next(err) }
}
