import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler.js'

// Import routes
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import alertsRouter from './routes/alerts.js'
import transactionsRouter from './routes/transactions.js'
import analyticsRouter from './routes/analytics.js'
import importRouter from './routes/import.js'
import promptRouter from './routes/prompt.js'

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/alerts', alertsRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/import', importRouter)
app.use('/api/prompt', promptRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND'
  })
})

// Global error handler (must be last)
app.use(errorHandler)

export default app
