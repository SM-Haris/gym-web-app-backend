import { AttendanceConstants, ErrorCodes } from '../constants'
import { Exception, Validators } from '../helpers'
import { AttendanceDatabaseInterface } from '../interfaces/Attendance'

class AttendanceUtil {
  static validateAttendanceFetchRequest(data: any) {
    if (
      !data.member_id ||
      !Validators.isValidStr(data.member_id) ||
      !data.to_date ||
      !Validators.isValidDate(data.to_date) ||
      !data.from_date ||
      !Validators.isValidDate(data.from_date)
    ) {
      throw new Exception(
        AttendanceConstants.MESSAGES.INVALID_ATTENDANCE_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return data
  }

  static validateAttendancePresentRequest(
    userCreatedAt: Date,
    attendance_data: AttendanceDatabaseInterface,
    member_id: string
  ) {
    const attendanceDate = new Date(`${attendance_data.date}T23:59:59.999Z`)
    const today = new Date()
    today.setUTCHours(23, 59, 59, 999)

    if (
      !member_id ||
      !Validators.isValidStr(member_id) ||
      !attendance_data.date ||
      !Validators.isValidDate(attendance_data.date) ||
      !attendance_data.workout_hours ||
      attendance_data.workout_hours > 8 ||
      userCreatedAt > attendanceDate ||
      attendanceDate.toISOString() > today.toISOString()
    ) {
      throw new Exception(
        AttendanceConstants.MESSAGES.INVALID_ATTENDANCE_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return {
      ...attendance_data,
      member_id,
    }
  }

  static validateAttendanceAbsentRequest(
    userCreatedAt: Date,
    attendance_data: AttendanceDatabaseInterface,
    member_id: string
  ) {
    const attendanceDate = new Date(`${attendance_data.date}T23:59:59.999Z`)
    const today = new Date()
    today.setHours(23, 59, 59, 999)

    if (
      !member_id ||
      !Validators.isValidStr(member_id) ||
      !attendance_data.date ||
      !Validators.isValidDate(attendance_data.date) ||
      userCreatedAt > attendanceDate ||
      attendanceDate < today
    ) {
      throw new Exception(
        AttendanceConstants.MESSAGES.INVALID_ATTENDANCE_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return {
      ...attendance_data,
      member_id,
    }
  }
}

export default AttendanceUtil
