import { Request, Response } from 'express'
import AuthManager from './AuthManager'
import { Validators } from '../../helpers'
import { ErrorCodes, UserConstants } from '../../constants'
import { Exception } from '../../interfaces/Exception'
import { LoginRequestBody, UserRequest } from '../../interfaces/Auth'

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const user = await AuthManager.signup(req.body)

      res.json({
        success: true,
        data: user,
      })
    } catch (err: any) {
      const customError = err as Exception

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
            : UserConstants.MESSAGES.SIGN_UP_FAILED,
        })
    }
  }

  static async validateUser(req: Request, res: Response) {
    try {
      const user = await AuthManager.validateUser(req as UserRequest)

      res.json({
        success: true,
        data: user,
      })
    } catch (err: any) {
      const customError = err as Exception

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
            : UserConstants.MESSAGES.USER_VALIDATION_FAILURE,
        })
    }
  }

  static async login(req: Request<{}, {}, LoginRequestBody>, res: Response) {
    try {
      const user = await AuthManager.login(req.body)

      res.json({
        success: true,
        data: user,
      })
    } catch (err) {
      const customError = err as Exception

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
            : UserConstants.MESSAGES.LOGIN_FAILED,
        })
    }
  }

  static async getUserDetails(req: Request, res: Response) {
    try {
      const user = await AuthManager.getUserDetails(req as UserRequest)

      res.json({
        success: true,
        data: user,
      })
    } catch (err) {
      const customError = err as Exception

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
            : UserConstants.MESSAGES.USER_DETAIL_FETCH_FAILURE,
        })
    }
  }
}

export default AuthController
