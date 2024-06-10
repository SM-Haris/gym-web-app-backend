import { Sequelize } from 'sequelize'
import { MemberDatabaseInterface } from '../interfaces/Member'
import Member from '../models/Member'
import Attendance from '../models/Attendance'

class MemberHandler {
  static async getMembersByGym(gym_id: string) {
    return Member.findAll({ where: { gym_id: gym_id }, raw: true })
  }

  static async createMember(data: MemberDatabaseInterface) {
    return Member.create(data)
  }

  static async updateMember(data: MemberDatabaseInterface) {
    return Member.update(data, { where: { id: data.id } })
  }

  static async findMemberById(member_id: string) {
    return Member.findOne({ where: { id: member_id }, raw: true })
  }

  static async getMemberIds(gymId: string) {
    return Member.findAll({
      where: {
        gym_id: gymId,
      },
      attributes: ['id'],
    });
  }
}

export default MemberHandler
