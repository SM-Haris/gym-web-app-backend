import Exception from '../../helpers/Exception'

class UserManager {
  static async getUser() {
    try {
      return "User Here"
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default UserManager
