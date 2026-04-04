import 'dotenv/config'
import app from './src/app.js'
import { startExpiryScanner } from './src/jobs/expiryScanner.js'
import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    // Run migrations on startup in production
    if (process.env.NODE_ENV === 'production') {
      console.log('⏳ Running database migrations...')
      try {
        const { stdout, stderr } = await execAsync('npx prisma migrate deploy --skip-generate', {
          cwd: process.cwd(),
        })
        console.log('✅ Migrations successful:', stdout)
        if (stderr) console.error('⚠️ Migration stderr:', stderr)
      } catch (err) {
        console.warn('⚠️ Migration warning (may already be applied):', err.message)
        // We continue anyway as the DB might already be in sync
      }
    }

    const server = app.listen(PORT, () => {
      console.log(`🚀 PharmaOS Monolith running on port ${PORT}`)
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

  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
