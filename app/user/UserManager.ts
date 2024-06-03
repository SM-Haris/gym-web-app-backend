import UserHandler from '../../handlers/UserHandler'
import Exception from '../../helpers/Exception'
import { SignUpRequestBody } from '../../interfaces/Auth'
import UserUtil from '../../utils/UserUtil'

class UserManager {
  static async getUser(user_id: string) {
    try {
      let users

      if (user_id) {
        users = await UserHandler.getUser(user_id)

        return users
      }

      users = await UserHandler.getAllUsers()

      return users
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async createUser(data: SignUpRequestBody) {
    try {
      const userData = UserUtil.validateUserCreationRequest(data)

      const user = UserHandler.createUser(userData)

      return user
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default UserManager
