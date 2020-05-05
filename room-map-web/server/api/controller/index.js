import { Router } from 'express'

import { search, pricePerSqmPositionDistrict, pricePerSqmAvg } from './room'

const router = Router()

router.get('/search', search)
router.get('/pricePerSqmPositionDistrict', pricePerSqmPositionDistrict)
router.get('/pricePerSqmAvg', pricePerSqmAvg)

export default router
