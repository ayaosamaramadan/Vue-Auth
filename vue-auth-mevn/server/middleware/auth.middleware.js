import { verifyToken } from '../utils/jwt.utils.js'
import User from '../models/User.model.js'

/**
 * Protect middleware — verifies Bearer JWT in Authorization header.
 * Attaches the user payload to req.user if valid.
 */
export const protect = async (req, res, next) => {
  try {
    let token

    // Support "Authorization: Bearer <token>"
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized — no token' })
    }

    // Verify token
    const decoded = verifyToken(token)

    // Check user still exists
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'User belonging to this token no longer exists' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired — please log in again' })
    }
    res.status(500).json({ message: error.message })
  }
}
