import { Response, Request } from 'express'
import Exception from '../../helpers/Exception'
import Validators from '../../helpers/Validators'
import ErrorCodes from '../../constants/ErrorCodes'
import MemberManager from './MemberManager'
import Member from '../../constants/Member'

class MemberController {
  static async getMember(req: Request, res: Response) {
    try {
      const status = await MemberManager.getMember()

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
            : Member.MESSAGES.FETCH_FAILURE,
        })
    }
  }
}

export default MemberController