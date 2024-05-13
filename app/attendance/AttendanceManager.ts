import Exception from '../../helpers/Exception'

class AttendanceManager {
  static async getAttendance() {
    try {
      return "Attendance Here"
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default AttendanceManager
