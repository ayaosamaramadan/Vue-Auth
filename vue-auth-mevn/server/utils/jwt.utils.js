import jwt from 'jsonwebtoken'

/**
 * Generate a signed JWT token for a user
 * @param {string} userId - MongoDB ObjectId of the user
 * @returns {string} signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

/**
 * Verify a JWT token and return its payload
 * @param {string} token
 * @returns {object} decoded payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
