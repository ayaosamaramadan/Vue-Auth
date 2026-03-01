import { generateToken } from '../utils/jwt.utils.js'

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

/**
 * Called after passport successfully authenticates the user.
 * Generates a JWT and redirects the browser back to the Vue frontend.
 */
export const oauthCallback = (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${CLIENT_URL}/auth/callback?error=OAuth+authentication+failed`)
    }
    const token = generateToken(req.user._id)
    // Pass token to the frontend via query param — the Vue callback page
    // reads it, stores in Vuex, then removes it from the URL.
    res.redirect(`${CLIENT_URL}/auth/callback?token=${token}`)
  } catch {
    res.redirect(`${CLIENT_URL}/auth/callback?error=Server+error`)
  }
}
