import { Response, Request } from 'express'
import Exception from '../../helpers/Exception'
import Validators from '../../helpers/Validators'
import ErrorCodes from '../../constants/ErrorCodes'
import AttendanceManager from './AttendanceManager'
import Attendance from '../../constants/Attendance'
import { UserRequest } from '../../interfaces/Auth'

class AttendanceController {
  static async getAttendance(req: Request, res: Response) {
    try {
      const status = await AttendanceManager.getAttendance(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Attendance.MESSAGES.FETCH_FAILURE,
        })
    }
  }

  static async markPresent(req: Request, res: Response) {
    try {
      const status = await AttendanceManager.markPresent(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Attendance.MESSAGES.PRESENT_FAILURE,
        })
    }
  }

  static async markAbsent(req: Request, res: Response) {
    try {
      const status = await AttendanceManager.markAbsent(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Attendance.MESSAGES.ABSENT_FAILURE,
        })
    }
  }
}

export default AttendanceController
