import AttendanceHandler from '../../handlers/AttendanceHandler'
import MemberHandler from '../../handlers/MemberHandler'
import Exception from '../../helpers/Exception'
import { UserRequest } from '../../interfaces/Auth'
import GymUtil from '../../utils/GymUtil'
import MemberUtil from '../../utils/MemberUtil'

interface AttendanceRecord {
  date: string;
  member_id: string;
}

interface AttendanceMap {
  [key: string]: Set<string>;
}

class MemberManager {
  static async getMember(req: UserRequest) {
    try {
      const today = new Date().toISOString().slice(0, 10)

      MemberUtil.validateMemberFetchRequest(req.params.gym_id as string)

      await GymUtil.validateGymExists(req.params.gym_id)

      const members = await MemberHandler.getMembersByGym(req.params.gym_id)

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

      const members = await MemberHandler.getMemberIds(req.params.gym_id)
  
      const memberIds = members.map(member => member.id);
  
      const attendanceRecords: AttendanceRecord[] = await  AttendanceHandler.getAttendanceStats(memberIds,req.params.from_data,req.params.to_date)
  
      const attendanceMap: AttendanceMap = attendanceRecords.reduce((map: AttendanceMap, record: AttendanceRecord) => {
        if (!map[record.date]) {
          map[record.date] = new Set();
        }
        map[record.date].add(record.member_id);
        return map;
      }, {} as AttendanceMap);
  
      const memberCounts: number[] = [];
      const memberIdsPerDay: string[][] = [];

      for (
        let dt = new Date(req.params.from_date);
        dt <= new Date(req.params.to_date);
        dt.setDate(dt.getDate() + 1)
      ) {
        const dateStr = dt.toISOString().split('T')[0];
        const membersOnDate = attendanceMap[dateStr] || new Set();
        memberCounts.push(membersOnDate.size);
        memberIdsPerDay.push(Array.from(membersOnDate));
      }
  
      return [{ name: "Member Count", values:memberCounts},{name: "Member Present", values: memberIdsPerDay }];
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
}

export default MemberManager
