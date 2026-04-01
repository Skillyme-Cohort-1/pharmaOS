import { Router } from 'express'
import { resolvePrompt } from '../controllers/promptController.js'
import { validate } from '../middleware/validate.js'
import { promptSchema } from '../middleware/schemas.js'

const router = Router()

router.post('/', validate(promptSchema), resolvePrompt)

export default router
