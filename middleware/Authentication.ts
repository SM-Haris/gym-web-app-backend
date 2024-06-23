import { NextFunction, Request, Response } from 'express'
import { User, UserRequest } from '../interfaces/Auth'
import { Exception, Validators, config, jwt } from '../helpers'
import { ErrorCodes, UserConstants } from '../constants'
import UserHandler from '../handlers/UserHandler'
import AuthUtil from '../utils/AuthUtil'

class Authentication {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization = '' } = req.headers

      const userDetails = AuthUtil.isValidAuthToken(authorization)

      const user: User = await UserHandler.getAuthenticateUser(
        userDetails.userId,
        userDetails.email,
        userDetails.token
      )

      if (!user) {
        throw new Exception(
          UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED,
          ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
          true
        )
      }

      ;(req as UserRequest).user = user

      next()
    } catch (error) {
      return res.status(ErrorCodes.UNAUTHORIZED).json({
        message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
      })
    }
  }
}

export default Authentication
