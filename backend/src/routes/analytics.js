import { Router } from 'express'
import {
  getSalesTrend,
  getTopProducts,
} from '../controllers/analyticsController.js'

const router = Router()

router.get('/sales', getSalesTrend)
router.get('/top-products', getTopProducts)

export default router
