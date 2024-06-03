import { AttendanceConstants, ErrorCodes } from '../constants'
import { Exception, Validators } from '../helpers'

class AttendanceUtil {
  static validateAttendanceFetchRequest(member_id: string) {
    if (!member_id || !Validators.isValidStr(member_id)) {
      throw new Exception(
        AttendanceConstants.MESSAGES.INVALID_ATTENDANCE_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return member_id
  }

  static validateAttendanceMarkRequest(date: string, member_id: string) {
    if (
      !member_id ||
      !Validators.isValidStr(member_id) ||
      !date ||
      !Validators.isValidDate(date)
    ) {
      throw new Exception(
        AttendanceConstants.MESSAGES.INVALID_ATTENDANCE_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return {
        member_id,
        date
    }
  }
}

export default AttendanceUtil
