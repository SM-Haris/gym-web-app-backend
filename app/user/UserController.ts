import { Response, Request } from 'express'
import Exception from '../../helpers/Exception'
import Validators from '../../helpers/Validators'
import ErrorCodes from '../../constants/ErrorCodes'
import UserManager from './UserManager'

class UserController {
  static async getUser(req: Request, res: Response) {
    try {
      const status = await UserManager.getUser()

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : User.MESSAGES.FETCH_FAILURE,
        })
    }
  }
}

export default UserController
