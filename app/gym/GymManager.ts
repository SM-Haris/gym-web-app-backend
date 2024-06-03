import GymHandler from '../../handlers/GymHandler'
import Exception from '../../helpers/Exception'
import { UserRequest } from '../../interfaces/Auth'
import GymUtil from '../../utils/GymUtil'

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
