import MemberHandler from '../../handlers/MemberHandler'
import Exception from '../../helpers/Exception'
import { UserRequest } from '../../interfaces/Auth'
import GymUtil from '../../utils/GymUtil'
import MemberUtil from '../../utils/MemberUtil'

class MemberManager {
  static async getMember(req: UserRequest) {
    try {
      MemberUtil.validateMemberFetchRequest(req.params.gym_id as string)

      await GymUtil.validateGymExists(req.params.gym_id)

      const members = MemberHandler.getMembersByGym(req.params.gym_id)

      return members
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
