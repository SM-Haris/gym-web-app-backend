import express from 'express'
import AttendanceController from '../app/attendance/AttendanceController'

const PREFIX = '/attendance'
const router = express.Router()

router.get(`${PREFIX}/`, AttendanceController.getAttendance)

export default router
