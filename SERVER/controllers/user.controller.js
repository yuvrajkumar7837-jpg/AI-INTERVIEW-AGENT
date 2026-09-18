import User from '../models/user_models.js'

export const getcurrentuser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching current user' })
  }
}
