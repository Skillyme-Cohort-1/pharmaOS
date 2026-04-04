import 'dotenv/config'
import app from './src/app.js'
import { startExpiryScanner } from './src/jobs/expiryScanner.js'
import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)  // This is /app/backend
const PORT = process.env.PORT || 3000

async function generatePrismaClient() {
  try {
    console.log('📦 Generating Prisma Client...')
    const { stdout } = await execAsync('npx prisma generate', {
      cwd: __dirname,
      maxBuffer: 1024 * 1024 * 10,
    })
    console.log('✅ Prisma Client generated')
    return true
  } catch (err) {
    console.warn('⚠️ Prisma generate warning:', err.message)
    return false
  }
}

async function runMigrations() {
  try {
    console.log('⏳ Running database migrations...')
    const { stdout, stderr } = await execAsync(
      `npx prisma migrate deploy --skip-generate`,
      { cwd: __dirname, maxBuffer: 1024 * 1024 * 10 }
    )
    console.log('✅ Migrations successful')
    if (stderr) console.log('📝 Migration notes:', stderr)
    return true
  } catch (err) {
    console.warn('⚠️ Migration warning (may already be applied):', err.message)
    return false
  }
}

async function startServer() {
  try {
    console.log(`📂 Backend directory: ${__dirname}`)
    console.log(`🌍 Working directory: ${process.cwd()}`)

    // Generate Prisma Client if missing
    await generatePrismaClient()

    // Run migrations only in production
    if (process.env.NODE_ENV === 'production') {
      await runMigrations()
    }

    // Initialize Prisma Client after generation
    const prisma = new PrismaClient()

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

  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
