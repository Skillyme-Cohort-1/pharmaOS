import { Router } from 'express'
import {
  getAllOrders,
  createOrder,
  updateOrderStatus,
} from '../controllers/orderController.js'
import { validate } from '../middleware/validate.js'
import { createOrderSchema, updateOrderStatusSchema } from '../middleware/schemas.js'

const router = Router()

router.get('/', getAllOrders)
router.post('/', validate(createOrderSchema), createOrder)
router.put('/:id/status', validate(updateOrderStatusSchema), updateOrderStatus)

export default router
