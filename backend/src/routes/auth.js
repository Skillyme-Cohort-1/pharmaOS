import { Router } from 'express'
import { login, logout, getMe } from '../controllers/auth.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Public routes
router.post('/login', login)

// Protected routes (require valid JWT)
router.get('/me', authenticate, getMe)
router.post('/logout', authenticate, logout)

export default router
