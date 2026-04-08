import { Router } from 'express'
import {
  getAllExpenses,
  getExpenseSummary,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js'

const router = Router()

router.get('/', getAllExpenses)
router.get('/summary', getExpenseSummary)
router.post('/', createExpense)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router
