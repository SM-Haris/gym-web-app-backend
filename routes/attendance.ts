import express from 'express'
import AttendanceController from '../app/attendance/AttendanceController'

const PREFIX = '/attendance'
const router = express.Router()

router.get(`${PREFIX}/:member_id`, AttendanceController.getAttendance)
router.post(`${PREFIX}/:member_id`, AttendanceController.markAttendance)

export default router
