import jwt from 'jsonwebtoken'

const generateToken = async (userid) => {
  try {
    return jwt.sign({ userId: userid }, process.env.JWT_SECRET, { expiresIn: '7d' })
  } catch (error) {
    console.log(error)
    throw new Error('Error generating token')
  }
}

export default generateToken
