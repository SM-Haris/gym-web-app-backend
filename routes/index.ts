import express from 'express'

const router = express.Router()

router.use('/api', eodRouter)
router.use('/api', healthRouter)

export default router
