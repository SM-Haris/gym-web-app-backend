import AttendanceHandler from '../../handlers/AttendanceHandler'
import MemberHandler from '../../handlers/MemberHandler'
import Exception from '../../helpers/Exception'
import { AttendanceCountQuery } from '../../interfaces/Attendance'
import { UserRequest } from '../../interfaces/Auth'
import Member from '../../models/Member'
import GymUtil from '../../utils/GymUtil'
import MemberUtil from '../../utils/MemberUtil'
import moment from 'moment'

class MemberManager {
  static async getMember(req: UserRequest) {
    try {
      const today = new Date().toISOString().slice(0, 10)

      const gymId = MemberUtil.validateMemberFetchRequest(
        req.params.gym_id as string
      )

      await GymUtil.validateGymExists(gymId)

      const members = await MemberHandler.getMembersByGym(gymId)

      const todayAttendance = await AttendanceHandler.getAttendanceByDate(today)

      const updatedMembers = await MemberUtil.markIsPresentToday(
        members,
        todayAttendance
      )

      return updatedMembers
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async getMemberStats(req: UserRequest) {
    try {
      MemberUtil.validateMemberFetchRequest(req.params.gym_id as string)

      await GymUtil.validateGymExists(req.params.gym_id)

      const fromDateObj = moment.utc(req.params.from_date)
      const toDateObj = moment.utc(req.params.to_date).add(1, 'days')

      const daysDifference = toDateObj.diff(fromDateObj, 'days')

      const attendanceData = (await AttendanceHandler.getAttendanceStats(
        req.params.gym_id,
        req.params.from_date,
        req.params.to_date
      )) as unknown as AttendanceCountQuery[]

      const allMembers: Member[] = await MemberHandler.getMembersByDate(
        req.params.gym_id,
        toDateObj
      )

      const totalMembersPerDay: number[] = new Array(daysDifference + 1).fill(0)
      const membersPresentPerDay: number[] = new Array(daysDifference + 1).fill(
        0
      )

      let memberIndex = 0
      let memberCount = 0

      for (const attendance of attendanceData) {
        membersPresentPerDay[
          moment(attendance.date).diff(fromDateObj, 'days') + 1
        ] = attendance.count
      }

      for (let i = 1; i <= daysDifference; i++) {
        const formattedDate = fromDateObj
          .add(1, 'days')
          .toISOString()
          .split('T')[0]

        while (
          memberIndex < allMembers.length &&
          allMembers[memberIndex].created_at.toISOString().split('T')[0] <=
            formattedDate &&
          formattedDate <= toDateObj.toISOString().split('T')[0]
        ) {
          memberCount++
          memberIndex++
        }

        totalMembersPerDay[i] = memberCount
      }

      return [
        { name: 'Total Members', values: totalMembersPerDay },
        { name: 'Members Present', values: membersPresentPerDay },
      ]
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async addMember(req: UserRequest) {
    try {
      const memberData = MemberUtil.validateMemberCreationRequest(
        req.body,
        req.params?.gym_id
      )

      await GymUtil.validateGymExists(req.params.gym_id)

      const member = MemberHandler.createMember(memberData)

      return member
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async updateMember(req: UserRequest) {
    try {
      const memberData = MemberUtil.validateMemberUpdationRequest(
        req.body,
        req.params.member_id as string
      )

      await MemberUtil.validateMemberExists(req.params.member_id)

      const member = MemberHandler.updateMember(memberData)

      return member
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async deleteMember(req: UserRequest) {
    try {
      const memberData = MemberUtil.validateMemberDeletionRequest(
        req.params.member_id as string
      )

      await MemberUtil.validateMemberExists(req.params.member_id)

      const member = MemberHandler.deleteMember(memberData.id)

      return member
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default MemberManager
