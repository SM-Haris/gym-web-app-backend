import { Op, Sequelize } from 'sequelize'
import { MemberDatabaseInterface } from '../interfaces/Member'
import Member from '../models/Member'
import Attendance from '../models/Attendance'
import { Moment } from 'moment'

class MemberHandler {
  static async getMembersByGym(gym_id: string) {
    return Member.findAll({ where: { gym_id: gym_id }, raw: true })
  }

  static async createMember(data: MemberDatabaseInterface) {
    return Member.create(data)
  }

  static async updateMember(data: MemberDatabaseInterface) {
    return Member.update(data, { where: { id: data.id }, returning: true })
  }

  static async deleteMember(member_id: string) {
    return Member.destroy({ where: { id: member_id } })
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

  static async getMembersByDate(gymId:string,toDate:Moment) {
    return Member.findAll({
      where: {
        gym_id: gymId,
        created_at: {
          [Op.lt]: toDate.toISOString(),
        },
      }, raw: true,
      order: [['created_at','ASC']]
    });
  }
}

export default MemberHandler
