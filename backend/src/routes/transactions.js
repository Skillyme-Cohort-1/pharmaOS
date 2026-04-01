import { Router } from 'express'
import {
  getAllTransactions,
  getTransactionSummary,
} from '../controllers/transactionController.js'

const router = Router()

router.get('/', getAllTransactions)
router.get('/summary', getTransactionSummary)

export default router
