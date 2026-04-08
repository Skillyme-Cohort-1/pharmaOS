import { Router } from 'express'
import {
  getAllPurchases,
  getPurchaseSummary,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from '../controllers/purchaseController.js'

const router = Router()

router.get('/', getAllPurchases)
router.get('/summary', getPurchaseSummary)
router.get('/:id', getPurchase)
router.post('/', createPurchase)
router.put('/:id', updatePurchase)
router.delete('/:id', deletePurchase)

export default router
