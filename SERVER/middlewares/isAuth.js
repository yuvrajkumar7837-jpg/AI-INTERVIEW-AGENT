import jwt from 'jsonwebtoken'

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace(/^Bearer\s+/i, '')
    if (!token || !process.env.JWT_SECRET) return res.status(401).json({ message: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.userId
    return next()
  } catch { return res.status(401).json({ message: 'Authentication error' }) }
}

export default isAuth
