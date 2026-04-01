import { Router } from 'express'
import {
  getAlerts,
  runScan,
  markAlertRead,
  markAllAlertsRead,
} from '../controllers/alertController.js'

const router = Router()

router.get('/', getAlerts)
router.post('/run', runScan)
router.put('/:id/read', markAlertRead)
router.put('/read-all', markAllAlertsRead)

export default router
