import { Router } from 'express'
import { register, login, getMe, logout } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

// Public routes
router.post('/register', register)
router.post('/login', login)

// Protected routes (need valid JWT)
router.get('/me', protect, getMe)
router.post('/logout', protect, logout)

export default router
