import AttendanceHandler from '../../handlers/AttendanceHandler'
import Exception from '../../helpers/Exception'
import { UserRequest } from '../../interfaces/Auth'
import Attendance from '../../models/Attendance'
import AttendanceUtil from '../../utils/AttendanceUtil'

interface AttendanceMap {
  [key: string]: number
}

class AttendanceManager {
  static async getAttendance(req: UserRequest) {
    try {
      const attendanceData = AttendanceUtil.validateAttendanceFetchRequest(
        req.params
      )

      const attendanceRecords: Attendance[] =
        await AttendanceHandler.getAttendanceByMember(attendanceData)

      const attendanceMap: AttendanceMap = attendanceRecords.reduce(
        (map: any, record) => {
          map[record.dataValues.date] = record.dataValues.workout_hours
          return map
        },
        {}
      )

      const dt = new Date(attendanceData.from_date)

      dt.setDate(dt.getDate() + 1)

      const hoursArray = []

      for (
        let dt = new Date(attendanceData.from_date);
        dt <= new Date(attendanceData.to_date);
        dt.setDate(dt.getDate() + 1)
      ) {
        const dateStr = dt.toISOString().split('T')[0]
        hoursArray.push(attendanceMap[dateStr] || 0)
      }

      return hoursArray
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async markPresent(req: UserRequest) {
    try {
      const attendanceData = AttendanceUtil.validateAttendancePresentRequest(
        req.user.created_at as Date,
        req.body,
        req.params.member_id
      )

      let attendance: Attendance | number | null =
        await AttendanceHandler.getAttendance(attendanceData)

      if (attendance) {
        await AttendanceHandler.updateAttendance(attendanceData)
      }

      attendance = await AttendanceHandler.markAttendance(attendanceData)

      return attendance
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async markAbsent(req: UserRequest) {
    try {
      const attendanceData = AttendanceUtil.validateAttendanceAbsentRequest(
        req.user.created_at as Date,
        req.body,
        req.params.member_id
      )

      const attendance =
        await AttendanceHandler.removeAttendance(attendanceData)

      return attendance
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default AttendanceManager
