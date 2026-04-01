import prisma from '../lib/prisma.js'
import { sendSuccess } from '../utils/responseHelper.js'

/**
 * Get sales trend data
 */
export async function getSalesTrend(req, res, next) {
  try {
    const { period = 7 } = req.query
    const days = parseInt(period)

    const now = new Date()
    const startDate = new Date(now)
    startDate.setDate(now.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

    // Get all sales in period
    const transactions = await prisma.transaction.findMany({
      where: {
        type: 'sale',
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' },
      select: {
        amount: true,
        createdAt: true,
      }
    })

    // Group by date
    const dailyData = {}
    
    // Initialize all days in period
    for (let i = days; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)
      const dateKey = date.toISOString().split('T')[0]
      dailyData[dateKey] = 0
    }

    // Sum amounts per day
    transactions.forEach(tx => {
      const dateKey = tx.createdAt.toISOString().split('T')[0]
      dailyData[dateKey] += Number(tx.amount)
    })

    // Convert to array for chart
    const result = Object.entries(dailyData).map(([date, amount]) => ({
      date,
      amount,
      formattedDate: new Date(date).toLocaleDateString('en-KE', { 
        month: 'short', 
        day: 'numeric' 
      })
    }))

    const total = result.reduce((sum, d) => sum + d.amount, 0)

    sendSuccess(res, 200, {
      data: result,
      total,
      period: days
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get top products by units or revenue
 */
export async function getTopProducts(req, res, next) {
  try {
    const { metric = 'units', period = 'week' } = req.query

    const now = new Date()
    let startDate = null

    if (period === 'week') {
      startDate = new Date(now)
      startDate.setDate(now.getDate() - 7)
    } else if (period === 'month') {
      startDate = new Date(now)
      startDate.setDate(now.getDate() - 30)
    }
    // 'all' means no date filter

    const where = { type: 'sale' }
    if (startDate) {
      where.createdAt = { gte: startDate }
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    // Aggregate by product
    const productStats = {}

    transactions.forEach(tx => {
      const productId = tx.product.id
      const productName = tx.product.name

      if (!productStats[productId]) {
        productStats[productId] = {
          id: productId,
          name: productName,
          units: 0,
          revenue: 0,
        }
      }

      productStats[productId].units += tx.quantity
      productStats[productId].revenue += Number(tx.amount)
    })

    // Convert to array and sort
    let result = Object.values(productStats)

    if (metric === 'revenue') {
      result.sort((a, b) => b.revenue - a.revenue)
    } else {
      result.sort((a, b) => b.units - a.units)
    }

    // Return top 5
    result = result.slice(0, 5)

    sendSuccess(res, 200, {
      data: result,
      metric,
      period,
    })
  } catch (error) {
    next(error)
  }
}
