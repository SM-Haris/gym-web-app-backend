import AttendanceHandler from '../../handlers/AttendanceHandler'
import Exception from '../../helpers/Exception'
import { UserRequest } from '../../interfaces/Auth'
import Attendance from '../../models/Attendance'
import AttendanceUtil from '../../utils/AttendanceUtil'

class AttendanceManager {
  static async getAttendance(req: UserRequest) {
    try {
      const memberId = AttendanceUtil.validateAttendanceFetchRequest(req.params.member_id)

      const attendance = await AttendanceHandler.getAttendanceByMember(memberId)

      return attendance
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async markAttendance(req: UserRequest) {
    try {
      const attendanceData = AttendanceUtil.validateAttendanceMarkRequest(req.body.date,req.params.member_id)

      let attendance: Attendance | number | null = await AttendanceHandler.getAttendance(attendanceData)

      if (attendance) {
        attendance = await AttendanceHandler.removeAttendance(attendanceData)

        return attendance
      }

      attendance = await AttendanceHandler.markAttendance(attendanceData)

      return attendance
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

}

export default AttendanceManager
