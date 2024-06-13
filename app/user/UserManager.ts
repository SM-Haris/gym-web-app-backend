import UserHandler from '../../handlers/UserHandler'
import Exception from '../../helpers/Exception'
import { SignUpRequestBody, UserRequest } from '../../interfaces/Auth'
import UserUtil from '../../utils/UserUtil'

class UserManager {
  static async getUser(req: UserRequest) {
    try {
      console.log(req.user)

      return req.user
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
