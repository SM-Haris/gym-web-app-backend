import express from 'express'
import GymRouter from './gym'
import AttendanceRouter from './attendance'
import UserRouter from './user'
import MemberRouter from './member'
import AuthRouter from './auth'

const router = express.Router()

router.use('/api', GymRouter)
router.use('/api', UserRouter)
router.use('/api', AttendanceRouter)
router.use('/api', MemberRouter)
router.use('/api', AuthRouter)

export default router
