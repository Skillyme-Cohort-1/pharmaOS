import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler.js'
import prisma from '../lib/prisma.js'

/**
 * Verify JWT from Authorization header and attach req.user
 */
export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED')
    }

    const token = authHeader.split(' ')[1]
    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new AppError('Session expired, please log in again', 401, 'TOKEN_EXPIRED')
      }
      throw new AppError('Invalid token', 401, 'INVALID_TOKEN')
    }

    // Attach user from DB to ensure it still exists
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true },
    })

    if (!user) {
      throw new AppError('User no longer exists', 401, 'USER_NOT_FOUND')
    }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}
