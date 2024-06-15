import moment from 'moment'
import GymHandler from '../../handlers/GymHandler'
import MemberHandler from '../../handlers/MemberHandler'
import Exception from '../../helpers/Exception'
import { UserRequest } from '../../interfaces/Auth'
import GymUtil from '../../utils/GymUtil'
import MemberUtil from '../../utils/MemberUtil'

class GymManager {
  static async getGym(req: UserRequest) {
    try {
      const gym = await GymHandler.findGymByOwner(req.user.id as string)

      return gym
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async getGymRevenue(req: UserRequest) {
    try {
      await GymUtil.validateGymExists(req.params.gym_id)

      const fromDateObj = moment.utc(req.params.from_date)
      const toDateObj = moment.utc(req.params.to_date).add(1, 'days')

      const members = await MemberHandler.getMembersByDate(
        req.params.gym_id,
        toDateObj
      )
      const daysDifference = toDateObj.diff(fromDateObj, 'days')

      const revenuePerDay: number[] = new Array(daysDifference + 1).fill(0)
      let memberIndex = 0
      let revenueSum = 0

      for (let i = 1; i <= daysDifference; i++) {
        const formattedDate = fromDateObj
          .add(1, 'days')
          .toISOString()
          .split('T')[0]

        while (
          memberIndex < members.length &&
          members[memberIndex].created_at.toISOString().split('T')[0] <=
            formattedDate &&
          formattedDate <= toDateObj.toISOString().split('T')[0]
        ) {
          revenueSum = revenueSum + Number(members[memberIndex].fee)
          memberIndex++
        }

        revenuePerDay[i] = revenueSum
      }

      return [{ name: 'Cummulative Fee of Members', values: revenuePerDay }]
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async createGym(req: UserRequest) {
    try {
      const gymData = GymUtil.validateGymCreationRequest(
        req.body,
        req.user.id as string
      )

      const gym = await GymHandler.createGym(gymData)

      return gym
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async updateGym(req: UserRequest) {
    try {
      const gymData = GymUtil.validateGymUpdationRequest(
        req.body,
        req.user.id as string,
        req.params.gym_id
      )

      const gym = await GymHandler.updateGym(gymData)

      return gym
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default GymManager
