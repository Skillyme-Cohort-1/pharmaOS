import { Router } from 'express'
import { upload, importProducts } from '../controllers/importController.js'

const router = Router()

router.post('/products', upload.single('file'), importProducts)

export default router
