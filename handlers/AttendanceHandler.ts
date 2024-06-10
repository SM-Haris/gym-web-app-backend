import { Op } from 'sequelize'
import { AttendanceDatabaseInterface } from '../interfaces/Attendance'
import Attendance from '../models/Attendance'

class AttendanceHandler {
  static async getAttendanceByMember(data: any) {
    return Attendance.findAll({ where: { member_id: data.member_id,
      date: {
        [Op.between]: [data.from_date, data.to_date],
      }, }, })
  }

  static async getAttendanceByDate(date: string) {
    return Attendance.findAll({ where: { date: date } })
  }

  static async getAttendance(data: AttendanceDatabaseInterface) {
    return Attendance.findOne({
      where: { member_id: data.member_id, date: data.date },
    })
  }

  static async markAttendance(data: AttendanceDatabaseInterface) {
    return Attendance.create(data)
  }

  static async updateAttendance(data: AttendanceDatabaseInterface) {
    return Attendance.update(data, {
      where: { date: data.date, member_id: data.member_id },
    })
  }

  static async removeAttendance(data: AttendanceDatabaseInterface) {
    return Attendance.destroy({
      where: { member_id: data.member_id, date: data.date },
    })
  }

  static async getAttendanceStats(memberIds: string[], fromDate:string, toDate:string) {
    return Attendance.findAll({
      where: {
        member_id: {
          [Op.in]: memberIds,
        },
        date: {
          [Op.between]: [fromDate, toDate],
        },
      },
      attributes: ['date', 'member_id'],
      order: [['date', 'ASC']],
    })
  }
}

export default AttendanceHandler
