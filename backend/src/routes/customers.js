import { Router } from 'express'
import {
  getAllCustomers,
  getTopCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js'

const router = Router()

router.get('/', getAllCustomers)
router.get('/top', getTopCustomers)
router.get('/:id', getCustomer)
router.post('/', createCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

export default router
