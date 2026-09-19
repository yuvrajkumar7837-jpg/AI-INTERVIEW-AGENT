import 'dotenv/config'
import express from 'express'
import connectDB from './config/connectdb.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import interviewRouter from './routes/interview.route.js'

const app = express()
const PORT = process.env.PORT || 8000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/interviews', interviewRouter)

app.use((err, req, res, next) => {
  console.error(err)
  const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : err.name === 'ValidationError' || err.name === 'CastError' ? 400 : (err.status || 500)
  res.status(status).json({
    message: status >= 500 ? 'Internal server error' : (err.message || 'Request failed'),
  })
})

const start = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log('Server running on port', PORT)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})
