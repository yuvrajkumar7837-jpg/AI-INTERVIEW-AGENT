import express from 'express'
import { getcurrentuser } from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js'

const userRouter = express.Router()

userRouter.get('/current', isAuth, getcurrentuser)

export default userRouter
