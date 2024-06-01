import express from 'express'
import GymRouter from './gym'
import AttendanceRouter from './attendance'
import UserRouter from './user'

const router = express.Router()

router.use('/api', GymRouter)
router.use('/api', UserRouter)
router.use('/api', AttendanceRouter)

export default router
