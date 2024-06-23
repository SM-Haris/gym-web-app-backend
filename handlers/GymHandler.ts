import { GymDatabaseInterface } from '../interfaces/Gym'
import Gym from '../models/Gym'

class GymHandler {
  static async findGymByOwner(userId: string) {
    return Gym.findOne({ where: { owner_id: userId } })
  }

  static async findGymById(gymId: string) {
    return Gym.findOne({ where: { id: gymId } })
  }

  static async createGym(data: GymDatabaseInterface) {
    return Gym.create(data)
  }

  static async updateGym(data: GymDatabaseInterface) {
    return Gym.update(data, {
      where: { owner_id: data.owner_id, id: data.gym_id },
      returning: true,
    })
  }
}

export default GymHandler
