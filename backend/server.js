import 'dotenv/config'
import app from './src/app.js'
import { startExpiryScanner } from './src/jobs/expiryScanner.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    // Run migrations on startup
    if (process.env.NODE_ENV === 'production') {
      console.log('📦 Running database migrations...')
      const { execSync } = await import('child_process')
      const path = await import('path')
      const backendDir = path.dirname(new URL(import.meta.url).pathname)
      try {
        execSync('npx prisma migrate deploy --skip-generate', { 
          stdio: 'inherit',
          cwd: backendDir
        })
        console.log('✅ Migrations completed successfully')
      } catch (err) {
        console.warn('⚠️ Migration warning (may already be applied):', err.message)
      }
    }

    const server = app.listen(PORT, () => {
      console.log(`🚀 PharmaOS API running on port ${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🔗 Health check: http://localhost:${PORT}/health`)
    })

    // Start expiry scanner cron job
    startExpiryScanner()

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...')
      server.close(async () => {
        await prisma.$disconnect()
        console.log('Server closed')
        process.exit(0)
      })
    })

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...')
      server.close(async () => {
        await prisma.$disconnect()
        console.log('Server closed')
        process.exit(0)
      })
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err)
    await prisma.$disconnect()
    process.exit(1)
  }
}

startServer()
