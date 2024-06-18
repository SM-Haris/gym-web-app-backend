import { Response, Request } from 'express'
import Exception from '../../helpers/Exception'
import Validators from '../../helpers/Validators'
import ErrorCodes from '../../constants/ErrorCodes'
import StripeManager from './StripeManager'
import { UserRequest } from '../../interfaces/Auth'
import { StripeConstants } from '../../constants'

class StripeController {
  static async checkout(req: Request, res: Response) {
    try {
      const status = await StripeManager.checkout(req as UserRequest)

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
            : StripeConstants.MESSAGES.CHECKOUT_FAILURE,
        })
    }
  }

  static async portalSession(req: Request, res: Response) {
    try {
      const status = await StripeManager.createPortalSession(req as UserRequest)

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
            : StripeConstants.MESSAGES.PORTAL_SESSION_FAILURE,
        })
    }
  }
}

export default StripeController
