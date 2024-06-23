import UserHandler from '../../handlers/UserHandler'
import Exception from '../../helpers/Exception'
import { SignUpRequestBody, User, UserRequest } from '../../interfaces/Auth'
import UserUtil from '../../utils/UserUtil'

class UserManager {
  static async getUser(req: UserRequest) {
    try {
      let userData = req.user

      delete userData.password

      return userData
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async deleteUser(req: UserRequest) {
    try {
      const user = await UserHandler.deleteUser(req.user.id as string)

      return user
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }

  static async updateUser(req: UserRequest) {
    try {
      const userData = await UserUtil.validateUserUpdationRequest(
        req.user.id as string,
        req.body
      )

      let user

      user = await UserHandler.updateUser(req.user.id as string, userData)

      user = UserUtil.filterUser(user[1][0] || req.user)

      return user
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
