import { Router } from 'express'

import controller from './controller'

const router = Router()

// Add databases Routes
router.use(controller)

export default router
