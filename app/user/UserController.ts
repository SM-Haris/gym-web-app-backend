import { Response, Request } from 'express'
import Exception from '../../helpers/Exception'
import Validators from '../../helpers/Validators'
import ErrorCodes from '../../constants/ErrorCodes'
import UserManager from './UserManager'
import User from '../../constants/User'
import { UserRequest } from '../../interfaces/Auth'

class UserController {
  static async getUser(req: Request, res: Response) {
    try {
      const status = await UserManager.getUser(req as UserRequest)

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

  static async deleteUser(req: Request, res: Response) {
    try {
      const status = await UserManager.deleteUser(req as UserRequest)

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
            : User.MESSAGES.DELETE_FAILURE,
        })
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const status = await UserManager.updateUser(req as UserRequest)

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
            : User.MESSAGES.UPDATE_USER_FAILED,
        })
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const status = await UserManager.createUser(req.body)

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
            : User.MESSAGES.CREATE_FAILURE,
        })
    }
  }
}

export default UserController
