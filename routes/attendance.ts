import express from 'express'
import AttendanceController from '../app/attendance/AttendanceController'
import { Authentication } from '../middleware'

const PREFIX = '/attendance'
const router = express.Router()

router.get(
  `${PREFIX}/:member_id`,
  Authentication.authenticate,
  AttendanceController.getAttendance
)
router.post(
  `${PREFIX}/mark_present/:member_id`,
  Authentication.authenticate,
  AttendanceController.markPresent
)
router.post(
  `${PREFIX}/mark_absent/:member_id`,
  Authentication.authenticate,
  AttendanceController.markAbsent
)

export default router
