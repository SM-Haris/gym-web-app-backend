import Exception from '../../helpers/Exception'

class GymManager {
  static async getGym() {
    try {
      return "Gym Here"
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default GymManager
