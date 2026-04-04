import { Router } from 'express'
import {
  getInventoryReportData,
  getExpiryReportData,
  getSalesReportData
} from '../controllers/reportController.js'

const router = Router()

// Endpoints strictly returning rich arrays mapping to reporting structures
router.get('/inventory', getInventoryReportData)
router.get('/expiry', getExpiryReportData)
router.get('/sales', getSalesReportData)

export default router
