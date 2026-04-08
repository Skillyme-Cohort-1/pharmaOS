import { Router } from 'express'
import {
  getAllIncomes,
  getIncomeSummary,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../controllers/incomeController.js'

const router = Router()

router.get('/', getAllIncomes)
router.get('/summary', getIncomeSummary)
router.post('/', createIncome)
router.put('/:id', updateIncome)
router.delete('/:id', deleteIncome)

export default router
