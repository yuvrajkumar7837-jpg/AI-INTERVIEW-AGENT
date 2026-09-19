import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import upload from '../middlewares/multer.js'
import { uploadResume, createInterview, submitAnswer, getInterview, getReport, completeInterview } from '../controllers/interview.controller.js'
const router = express.Router()
router.use(isAuth)
router.post('/resume', upload.single('resume'), uploadResume)
router.post('/', createInterview)
router.get('/:id', getInterview)
router.get('/:id/report', getReport)
router.post('/:id/answers', submitAnswer)
router.post('/:id/complete', completeInterview)
export default router
