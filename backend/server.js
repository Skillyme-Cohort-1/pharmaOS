import 'dotenv/config'
import app from './src/app.js'
import { startExpiryScanner } from './src/jobs/expiryScanner.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`🚀 PharmaOS API running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
})

// Start expiry scanner cron job
startExpiryScanner()

// Graceful shutdown logic
const shutdown = async (signal) => {
  console.log(`${signal} received, shutting down gracefully...`)
  server.close(async () => {
    await prisma.$disconnect()
    console.log('Server closed')
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
