import { Router } from 'express'
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { validate } from '../middleware/validate.js'
import { createProductSchema, updateProductSchema } from '../middleware/schemas.js'

const router = Router()

router.get('/', getAllProducts)
router.post('/', validate(createProductSchema), createProduct)
router.put('/:id', validate(updateProductSchema), updateProduct)
router.delete('/:id', deleteProduct)

export default router
