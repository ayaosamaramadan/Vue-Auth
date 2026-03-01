import { Router } from 'express'
import passport from '../config/passport.js'
import { register, login, getMe, logout } from '../controllers/auth.controller.js'
import { oauthCallback } from '../controllers/oauth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

// Guard: return a friendly redirect if the OAuth strategy isn't registered
const requireStrategy = (name) => (_req, res, next) => {
  try { passport._strategy(name); next() }
  catch { res.redirect(`${CLIENT_URL}/auth/callback?error=${name}+OAuth+not+configured`) }
}

// ── Email / Password ────────────────────────────────────────────────────────
router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/logout', protect, logout)

// ── Google OAuth ────────────────────────────────────────────────────────────
router.get('/google', requireStrategy('google'),
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
router.get('/google/callback', requireStrategy('google'),
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  oauthCallback)

// ── GitHub OAuth ────────────────────────────────────────────────────────────
router.get('/github', requireStrategy('github'),
  passport.authenticate('github', { scope: ['user:email'], session: false }))
router.get('/github/callback', requireStrategy('github'),
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  oauthCallback)

export default router
