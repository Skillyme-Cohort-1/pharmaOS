import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import { AppError } from '../middleware/errorHandler.js'

/**
 * Sign a JWT for a user
 */
function signToken(userId) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

/**
 * POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new AppError('Email and password are required', 400, 'VALIDATION_ERROR')
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } })
    if (!user) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS')
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS')
    }

    const token = signToken(user.id)

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/auth/me
 * Returns the currently authenticated user (req.user is set by auth middleware)
 */
export async function getMe(req, res) {
  res.json({
    success: true,
    data: req.user,
  })
}

/**
 * POST /api/auth/logout
 * Stateless JWT — client deletes token; server just confirms
 */
export async function logout(req, res) {
  res.json({ success: true, message: 'Logged out successfully' })
}
