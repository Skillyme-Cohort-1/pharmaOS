import { Router } from 'express'
import {
  getAllSettings,
  getSetting,
  updateSetting,
  updateBulkSettings,
} from '../controllers/settingController.js'

const router = Router()

router.get('/', getAllSettings)
router.get('/:key', getSetting)
router.put('/:key', updateSetting)
router.put('/bulk', updateBulkSettings)

export default router
