import express from 'express'
import { getcurrentuser } from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js'
import upload from '../middlewares/multer.js'
import { uploadResume, listResumes, getResume, createInterview, listInterviews, getInterview, submitAnswer, completeInterview, getReport } from '../controllers/interview.controller.js'

const userRouter = express.Router()

userRouter.get('/current', isAuth, getcurrentuser)
userRouter.post('/resumes', isAuth, upload.single('resume'), uploadResume)
userRouter.get('/resumes', isAuth, listResumes)
userRouter.get('/resumes/:id', isAuth, getResume)
userRouter.post('/interviews', isAuth, createInterview)
userRouter.get('/interviews', isAuth, listInterviews)
userRouter.get('/interviews/:id', isAuth, getInterview)
userRouter.post('/interviews/:id/answers', isAuth, submitAnswer)
userRouter.post('/interviews/:id/complete', isAuth, completeInterview)
userRouter.get('/reports/:id', isAuth, getReport)

export default userRouter
