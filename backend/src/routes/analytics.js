import { Router } from 'express'
import {
  getSalesTrend,
  getTopProducts,
  getDashboard,
  getProfitLoss,
  getRevenue,
} from '../controllers/analyticsController.js'

const router = Router()

router.get('/sales', getSalesTrend)
router.get('/top-products', getTopProducts)
router.get('/dashboard', getDashboard)
router.get('/profit-loss', getProfitLoss)
router.get('/revenue', getRevenue)

export default router
