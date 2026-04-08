import { Router } from 'express'
import {
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController.js'

const router = Router()

router.get('/', getAllSuppliers)
router.get('/:id', getSupplier)
router.post('/', createSupplier)
router.put('/:id', updateSupplier)
router.delete('/:id', deleteSupplier)

export default router
